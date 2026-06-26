package com.ordergo.backend.uploadFile.impl;

import com.ordergo.backend.uploadFile.UploadFileService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class UploadFileServiceImpl implements UploadFileService {

    @Value("${dir_upload}")
    private String uploadFolder;
    private Map<String, String> pathFiles;

    @PostConstruct
    @Override
    public void init() throws IOException {
        createPath(uploadFolder);
        System.out.println(uploadFolder);
        pathFiles = new HashMap();
        pathFiles.put("fotos", uploadFolder + "/fotos/");
        pathFiles.put("productos", uploadFolder + "/productos/imagenes/{categoria}/");
    }

    @Override
    public Resource load(String type, Map<String, String> items, String filename) throws MalformedURLException {
        Path pathFile = getPathFile(type, items, filename);

        Resource recurso = new UrlResource(pathFile.toUri());

        if (!recurso.exists() || !recurso.isReadable()) {
            log.error("No se puede acceder a: " + pathFile);
            throw new RuntimeException("Error: no se puede cargar la imagen: " + pathFile.toString());
        }
        return recurso;
    }

    @Override
    public String copy(String type, Map<String, String> items, MultipartFile file) throws IOException {
        String uniqueFilename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path rootPath = getPathDirectory(type, items);
        createPath(rootPath.toString());

        log.info("rootPath: " + rootPath);

        Files.copy(file.getInputStream(), getPathFile(type, items, uniqueFilename));

        return uniqueFilename;
    }

    @Override
    public boolean delete(String type, Map<String, String> items, String filename) {
        Path rootPath = getPathFile(type, items, filename);
        File archivo = rootPath.toFile();

        if (archivo.exists() && archivo.canRead()) {
            if (archivo.delete()) {
                return true;
            }
        }
        log.error("No se puede borrar el archivo: " + rootPath);
        return false;
    }

    public Path getPathDirectory(String type, Map<String, String> items) {
        String pathTemplate = pathFiles.get(type);

        if (pathTemplate == null) {
            log.error("Tipo de plantilla no válida: " + type);
            throw new IllegalArgumentException("Tipo de plantilla no válida: " + type);
        }

        String path = pathTemplate;

        if (items != null) {
            for (Map.Entry<String, String> entry : items.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();

                path = path.replace("{" + key + "}", value);
            }
        }

        return Paths.get(path).toAbsolutePath();
    }

    public Path getPathFile(String type, Map<String, String> items, String filename) {
        Path rootPath = getPathDirectory(type, items);
        Path filePath = rootPath.resolve(filename);
        return filePath;
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(Paths.get(uploadFolder).toFile());

    }

    @Override
    public String getUploadFolder() {
        return uploadFolder;
    }


    private void createPath(String ruta) throws IOException {
        Path path = FileSystems.getDefault().getPath(ruta);
        Files.createDirectories(path);
    }

}
