package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.Notification;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for notification management
 */
@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Send notification
     */
    public Notification sendNotification(Notification notification) {
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    /**
     * Get notification by ID
     */
    public Notification getNotificationById(String id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
    }

    /**
     * Get user notifications
     */
    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Get unread notifications for user
     */
    public List<Notification> getUnreadNotifications(String userId) {
        return notificationRepository.findByUserIdAndRead(userId, false);
    }

    /**
     * Mark notification as read
     */
    public Notification markAsRead(String id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        notification.setRead(true);
        notification.setReadAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    /**
     * Mark all notifications as read
     */
    public void markAllAsRead(String userId) {
        List<Notification> unread = notificationRepository.findByUserIdAndRead(userId, false);

        unread.forEach(notification -> {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
        });

        notificationRepository.saveAll(unread);
    }

    /**
     * Delete notification
     */
    public void deleteNotification(String id) {
        if (!notificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Notification not found with id: " + id);
        }
        notificationRepository.deleteById(id);
    }

    /**
     * Delete all notifications for user
     */
    public void deleteAllNotifications(String userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        notificationRepository.deleteAll(notifications);
    }
}

