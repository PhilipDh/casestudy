package com.casestudy;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Handler;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;

import java.net.URL;

public class ReactImageManager extends SimpleViewManager<ReactImageView> {


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

        final ReactImageView reactImageView = new ReactImageView(reactContext, Fresco.newDraweeControllerBuilder(), null, mCallerContext);

        final Handler handler = new Handler();
        imgStartListener = new ImgStartListener() {
            @Override
            public void startLoading(final String imgUrl) {
                loadWithGlide(imgUrl, reactImageView, reactContext);
                //startDownloading(imgUrl, handler, reactImageView);

            }
        };

        return reactImageView;
    }

    private void loadWithGlide(String url, ReactImageView imageView, ThemedReactContext context){
        Glide
                .with(context)
                .load(url)
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .skipMemoryCache(true)
                .centerCrop()
                .into(imageView);
    }

}
