package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.StudentDocument;
import edu.iti.schoolmis.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for document management endpoints
 */
@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    /**
     * Upload document
     * POST /api/documents
     */
    @PostMapping
    public ResponseEntity<StudentDocument> uploadDocument(@RequestBody StudentDocument document) {
        StudentDocument response = documentService.uploadDocument(document);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get document by ID
     * GET /api/documents/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentDocument> getDocumentById(@PathVariable String id) {
        StudentDocument response = documentService.getDocumentById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student documents
     * GET /api/documents/student/{studentId}
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<StudentDocument>> getStudentDocuments(@PathVariable String studentId) {
        List<StudentDocument> response = documentService.getStudentDocuments(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get documents by type
     * GET /api/documents/type/{documentType}
     */
    @GetMapping("/type/{documentType}")
    public ResponseEntity<List<StudentDocument>> getDocumentsByType(@PathVariable String documentType) {
        List<StudentDocument> response = documentService.getDocumentsByType(documentType);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student documents by type
     * GET /api/documents/student/{studentId}/type/{documentType}
     */
    @GetMapping("/student/{studentId}/type/{documentType}")
    public ResponseEntity<List<StudentDocument>> getStudentDocumentsByType(
            @PathVariable String studentId,
            @PathVariable String documentType) {
        List<StudentDocument> response = documentService.getStudentDocumentsByType(studentId, documentType);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Verify document
     * PATCH /api/documents/{id}/verify
     */
    @PatchMapping("/{id}/verify")
    public ResponseEntity<StudentDocument> verifyDocument(@PathVariable String id) {
        StudentDocument response = documentService.verifyDocument(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update document
     * PUT /api/documents/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentDocument> updateDocument(
            @PathVariable String id,
            @RequestBody StudentDocument document) {
        StudentDocument response = documentService.updateDocument(id, document);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Delete document
     * DELETE /api/documents/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String id) {
        documentService.deleteDocument(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

