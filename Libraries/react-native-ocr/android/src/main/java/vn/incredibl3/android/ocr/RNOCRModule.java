package vn.incredibl3.android.ocr;

import android.accounts.Account;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class RNOCRModule extends ReactContextBaseJavaModule {
    private static final int RC_OCR_CAPTURE = 9003;
    private static ReactApplicationContext mContext = null;

    public RNOCRModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOCRModule";
    }

    @ReactMethod
    public void startOCR() {
        Intent intent = new Intent(mContext, OcrCaptureActivity.class);
        intent.putExtra(OcrCaptureActivity.AutoFocus, true);
        intent.putExtra(OcrCaptureActivity.UseFlash, false);

        mContext.getCurrentActivity().startActivityForResult(intent, RC_OCR_CAPTURE);
    }
}
