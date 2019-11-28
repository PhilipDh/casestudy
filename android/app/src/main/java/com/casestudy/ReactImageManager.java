package com.casestudy;

import android.os.Handler;

import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;

public class ReactImageManager extends SimpleViewManager<ReactImageView> {


    //Name of the React component that should be required
    public static final String REACT_CLASS = "RCTImageView1";
    private final @Nullable
    Object mCallerContext = null;
    private ImgStartListener imgStartListener;

    /* Interface Listener to start loading the image if the source is set */
    private interface ImgStartListener {
        void startLoading(String imgUrl);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    /* Method which sets the source from React Native */
    @ReactProp(name = "src")
    public void setSrc(ReactImageView view, String uri) {
        imgStartListener.startLoading(uri);
    }

    @Override
    protected ReactImageView createViewInstance(ThemedReactContext reactContext) {

        //Create a new ReactImageView
        final ReactImageView reactImageView = new ReactImageView(reactContext, Fresco.newDraweeControllerBuilder(), null, mCallerContext);

        //Upon creation of the image start loading with the loadWithGlide function
        final Handler handler = new Handler();
        imgStartListener = new ImgStartListener() {
            @Override
            public void startLoading(final String imgUrl) {
                loadWithGlide(imgUrl, reactImageView, reactContext);

            }
        };

        return reactImageView;
    }


    /**
     * Function that uses Glide as the HTTP request manager to load an image
     * @param url location of the image
     * @param imageView React component that the image should be loaded into
     * @param context Context that Glide should use to avoid memory leaks
     */
    private void loadWithGlide(String url, ReactImageView imageView, ThemedReactContext context){
        Glide
                .with(context)
                .load(url)
                .diskCacheStrategy(DiskCacheStrategy.NONE) //Disable caching
                .skipMemoryCache(true) //disable caching
                .centerCrop()
                .into(imageView);
    }

}
