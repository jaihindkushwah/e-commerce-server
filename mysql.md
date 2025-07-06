CREATE TABLE `Product`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` TEXT NOT NULL,
    `desc` TEXT NOT NULL,
    `quantity` BIGINT NOT NULL,
    `price` BIGINT NOT NULL
);
CREATE TABLE `ProductImage`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `img_url` TEXT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);
CREATE TABLE `Cart`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);
CREATE TABLE `CartItem`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cart_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL
);
CREATE TABLE `ProductReview`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `rating` INT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `review` TEXT NOT NULL
);
CREATE TABLE `Category`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` BIGINT NOT NULL
);
CREATE TABLE `Booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL,
    `booking_at` DATETIME NOT NULL,
    `status` ENUM('') NOT NULL,
    `payment_status` ENUM('') NOT NULL,
    `order_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);
CREATE TABLE `CustomerAddress`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `address_line1` VARCHAR(255) NOT NULL,
    `address_line2` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `is_default` BOOLEAN NOT NULL,
    `created_at` BIGINT NOT NULL
);
CREATE TABLE `Orders`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `total` BIGINT NOT NULL,
    `status` ENUM('') NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `shipping_address_id` BIGINT NOT NULL,
    `billing_address_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);
CREATE TABLE `Notification`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `type` ENUM('') NOT NULL,
    `reference_id` BIGINT NOT NULL,
    `is_read` BOOLEAN NOT NULL,
    `created_at` DATETIME NOT NULL
);
CREATE TABLE `NotificationChannelLog`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `notification_id` BIGINT NOT NULL,
    `channel` ENUM('') NOT NULL,
    `status` ENUM('') NOT NULL,
    `sent_at` DATETIME NOT NULL,
    `error_message` TEXT NOT NULL
);
