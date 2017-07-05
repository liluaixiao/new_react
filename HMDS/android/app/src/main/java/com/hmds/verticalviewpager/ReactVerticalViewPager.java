/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.hmds.verticalviewpager;

import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.ArrayList;
import java.util.List;


public class ReactVerticalViewPager extends ViewPager {

  private void init() {
    // The majority of the magic happens here
    setPageTransformer(true, new VerticalPageTransformer());
    // The easiest way to get rid of the overscroll drawing that happens on the left and right
    setOverScrollMode(OVER_SCROLL_NEVER);
  }

  private class VerticalPageTransformer implements ViewPager.PageTransformer {

    @Override
    public void transformPage(View view, float position) {

      if (position < -1) { // [-Infinity,-1)
        // This page is way off-screen to the left.
        view.setAlpha(0);

      } else if (position <= 1) { // [-1,1]
        view.setAlpha(1);

        // Counteract the default slide transition
        view.setTranslationX(view.getWidth() * -position);

        //set Y position to swipe in from top
        float yPosition = position * view.getHeight();
        view.setTranslationY(yPosition);

      } else { // (1,+Infinity]
        // This page is way off-screen to the right.
        view.setAlpha(0);
      }
    }
  }

  private class Adapter extends PagerAdapter {

    private final List<View> mViews = new ArrayList<>();
    private boolean mIsViewPagerInIntentionallyInconsistentState = false;

    void addView(View child, int index) {
      mViews.add(index, child);
      notifyDataSetChanged();
      // This will prevent view pager from detaching views for pages that are not currently selected
      // We need to do that since {@link ViewPager} relies on layout passes to position those views
      // in a right way (also thanks to {@link ReactViewPagerManager#needsCustomLayoutForChildren}
      // returning {@code true}). Currently we only call {@link View#measure} and
      // {@link View#layout} after yoga step.

      // TODO(7323049): Remove this workaround once we figure out a way to re-layout some views on
      // request
      setOffscreenPageLimit(mViews.size());
    }

    void removeViewAt(int index) {
      mViews.remove(index);
      notifyDataSetChanged();

      // TODO(7323049): Remove this workaround once we figure out a way to re-layout some views on
      // request
      setOffscreenPageLimit(mViews.size());
    }

    /**
     * Replace a set of views to the ViewPager adapter and update the ViewPager
     */
    void setViews(List<View> views) {
      mViews.clear();
      mViews.addAll(views);
      notifyDataSetChanged();

      // we want to make sure we return POSITION_NONE for every view here, since this is only
      // called after a removeAllViewsFromAdapter
      mIsViewPagerInIntentionallyInconsistentState = false;
    }

    /**
     * Remove all the views from the adapter and de-parents them from the ViewPager
     * After calling this, it is expected that notifyDataSetChanged should be called soon
     * afterwards.
     */
    void removeAllViewsFromAdapter(ViewPager pager) {
      mViews.clear();
      pager.removeAllViews();
      // set this, so that when the next addViews is called, we return POSITION_NONE for every
      // entry so we can remove whichever views we need to and add the ones that we need to.
      mIsViewPagerInIntentionallyInconsistentState = true;
    }

    View getViewAt(int index) {
      return mViews.get(index);
    }

    @Override
    public int getCount() {
      return mViews.size();
    }

    @Override
    public int getItemPosition(Object object) {
      // if we've removed all views, we want to return POSITION_NONE intentionally
      return mIsViewPagerInIntentionallyInconsistentState || !mViews.contains(object) ?
        POSITION_NONE : mViews.indexOf(object);
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
      View view = mViews.get(position);
      container.addView(view, 0, generateDefaultLayoutParams());
      return view;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
      container.removeView((View) object);
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
      return view == object;
    }
  }

  private class PageChangeListener implements OnPageChangeListener {

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
      mEventDispatcher.dispatchEvent(
          new PageScrollEvent(getId(), position, positionOffset));
    }

    @Override
    public void onPageSelected(int position) {
      if (!mIsCurrentItemFromJs) {
        mEventDispatcher.dispatchEvent(
            new PageSelectedEvent(getId(), position));
      }
    }

    @Override
    public void onPageScrollStateChanged(int state) {
      String pageScrollState;
      switch (state) {
        case SCROLL_STATE_IDLE:
          pageScrollState = "idle";
          break;
        case SCROLL_STATE_DRAGGING:
          pageScrollState = "dragging";
          break;
        case SCROLL_STATE_SETTLING:
          pageScrollState = "settling";
          break;
        default:
          throw new IllegalStateException("Unsupported pageScrollState");
      }
      mEventDispatcher.dispatchEvent(
        new PageScrollStateChangedEvent(getId(), pageScrollState));
    }
  }

  private final EventDispatcher mEventDispatcher;
  private boolean mIsCurrentItemFromJs;
  private boolean mScrollEnabled = true;

  public ReactVerticalViewPager(ReactContext reactContext) {
    super(reactContext);
    init();
    mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
    mIsCurrentItemFromJs = false;
    setOnPageChangeListener(new PageChangeListener());
    setAdapter(new Adapter());
  }

  @Override
  public Adapter getAdapter() {
    return (Adapter) super.getAdapter();
  }

  private MotionEvent swapXY(MotionEvent ev) {
    float width = getWidth();
    float height = getHeight();

    float newX = (ev.getY() / height) * width;
    float newY = (ev.getX() / width) * height;

    ev.setLocation(newX, newY);

    return ev;
  }

  @Override
  public boolean onInterceptTouchEvent(MotionEvent ev){
    boolean intercepted = super.onInterceptTouchEvent(swapXY(ev));
    swapXY(ev); // return touch coordinates to original reference frame for any child views
    return intercepted;
  }

  @Override
  public boolean onTouchEvent(MotionEvent ev) {
    return super.onTouchEvent(swapXY(ev));
  }

  public void setCurrentItemFromJs(int item, boolean animated) {
    mIsCurrentItemFromJs = true;
    setCurrentItem(item, animated);
    mIsCurrentItemFromJs = false;
  }

  public void setScrollEnabled(boolean scrollEnabled) {
    mScrollEnabled = scrollEnabled;
  }

  /*package*/ void addViewToAdapter(View child, int index) {
    getAdapter().addView(child, index);
  }

  /*package*/ void removeViewFromAdapter(int index) {
    getAdapter().removeViewAt(index);
  }

  /*package*/ int getViewCountInAdapter() {
    return getAdapter().getCount();
  }

  /*package*/ View getViewFromAdapter(int index) {
    return getAdapter().getViewAt(index);
  }

  public void setViews(List<View> views) {
    getAdapter().setViews(views);
  }

  public void removeAllViewsFromAdapter() {
    getAdapter().removeAllViewsFromAdapter(this);
  }
}
