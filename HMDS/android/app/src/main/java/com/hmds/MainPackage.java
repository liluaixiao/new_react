package com.hmds;

import com.facebook.react.LazyReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;
import com.hmds.verticalviewpager.ReactVerticalViewPagerManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Alive on 2017/7/4.
 */

public class MainPackage extends LazyReactPackage {

//    private MainPackageConfig mConfig;

    public MainPackage() {
    }

    /**
     * Create a new package with configuration
     */
//    public MainReactPackage(MainPackageConfig config) {
//        mConfig = config;
//    }
    @Override
    public List<ModuleSpec> getNativeModules(final ReactApplicationContext context) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> viewManagers = new ArrayList<>();
        viewManagers.add(new ReactVerticalViewPagerManager());

        return viewManagers;
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        // This has to be done via reflection or we break open source.
        return LazyReactPackage.getReactModuleInfoProviderViaReflection(this);
    }
}
