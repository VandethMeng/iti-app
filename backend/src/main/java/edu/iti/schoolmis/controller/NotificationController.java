package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.Notification;
import edu.iti.schoolmis.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for notification management endpoints
 */
@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /**
     * Send notification
     * POST /api/notifications
     */
    @PostMapping
    public ResponseEntity<Notification> sendNotification(@RequestBody Notification notification) {
        Notification response = notificationService.sendNotification(notification);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get notification by ID
     * GET /api/notifications/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable String id) {
        Notification response = notificationService.getNotificationById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get user notifications
     * GET /api/notifications/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable String userId) {
        List<Notification> response = notificationService.getUserNotifications(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get unread notifications
     * GET /api/notifications/user/{userId}/unread
     */
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable String userId) {
        List<Notification> response = notificationService.getUnreadNotifications(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Mark notification as read
     * PATCH /api/notifications/{id}/read
     */
    @PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        Notification response = notificationService.markAsRead(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Mark all notifications as read
     * PATCH /api/notifications/user/{userId}/read-all
     */
    @PatchMapping("/user/{userId}/read-all")
    public ResponseEntity<Void> markAllAsRead(@PathVariable String userId) {
        notificationService.markAllAsRead(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete notification
     * DELETE /api/notifications/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Delete all notifications for user
     * DELETE /api/notifications/user/{userId}
     */
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllNotifications(@PathVariable String userId) {
        notificationService.deleteAllNotifications(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

