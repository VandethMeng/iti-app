package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.StudentDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for StudentDocument entity
 */
@Repository
public interface DocumentRepository extends MongoRepository<StudentDocument, String> {
    List<StudentDocument> findByStudentId(String studentId);
    List<StudentDocument> findByDocumentType(String documentType);
    List<StudentDocument> findByStudentIdAndDocumentType(String studentId, String documentType);
}

