package com.ordergo.backend.uploadFile;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;

public interface UploadFileService {
    Resource load(String type, Map<String, String> items, String filename) throws MalformedURLException;

    String copy(String type, Map<String, String> items, MultipartFile file) throws IOException;

    boolean delete(String type, Map<String, String> items, String filename);

    void deleteAll();

    void init() throws IOException;

    String getUploadFolder();
}
