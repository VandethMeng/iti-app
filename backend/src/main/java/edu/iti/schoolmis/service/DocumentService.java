package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.StudentDocument;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for document management
 */
@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    /**
     * Upload document
     */
    public StudentDocument uploadDocument(StudentDocument document) {
        document.setCreatedAt(LocalDateTime.now());
        document.setUpdatedAt(LocalDateTime.now());
        document.setVerified(false);
        return documentRepository.save(document);
    }

    /**
     * Get document by ID
     */
    public StudentDocument getDocumentById(String id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
    }

    /**
     * Get student documents
     */
    public List<StudentDocument> getStudentDocuments(String studentId) {
        return documentRepository.findByStudentId(studentId);
    }

    /**
     * Get documents by type
     */
    public List<StudentDocument> getDocumentsByType(String documentType) {
        return documentRepository.findByDocumentType(documentType);
    }

    /**
     * Get student documents by type
     */
    public List<StudentDocument> getStudentDocumentsByType(String studentId, String documentType) {
        return documentRepository.findByStudentIdAndDocumentType(studentId, documentType);
    }

    /**
     * Verify document
     */
    public StudentDocument verifyDocument(String id) {
        StudentDocument document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        document.setVerified(true);
        document.setUpdatedAt(LocalDateTime.now());

        return documentRepository.save(document);
    }

    /**
     * Update document
     */
    public StudentDocument updateDocument(String id, StudentDocument document) {
        StudentDocument existingDoc = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        existingDoc.setFileName(document.getFileName());
        existingDoc.setFileUrl(document.getFileUrl());
        existingDoc.setMimeType(document.getMimeType());
        existingDoc.setFileSize(document.getFileSize());
        existingDoc.setRemarks(document.getRemarks());
        existingDoc.setUpdatedAt(LocalDateTime.now());

        return documentRepository.save(existingDoc);
    }

    /**
     * Delete document
     */
    public void deleteDocument(String id) {
        if (!documentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Document not found with id: " + id);
        }
        documentRepository.deleteById(id);
    }
}

