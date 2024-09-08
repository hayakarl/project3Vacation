-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(450) NOT NULL,
  `fromDate` date DEFAULT NULL,
  `untilDate` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `imageName` varchar(50) DEFAULT 'Null',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (108,'מורזין','חופשת רכיבה באלפים הצרפתים. 650 ק\"מ של מסלולים הפרוסים על פני שטח עצום ומקושרים ביניהם ב-24 רכבלים שמעלים אופניים, ומאפשרים לכם רכיבה למרחקים עצומים בנוף עוצר נשימה. במרכזו של האזור תמצאו את מורזין, עיירה צבעונית בה רוב מי שתפגשו ברחוב הם רוכבי אופניים','2025-04-21','2025-04-28',3000.00,'b4da277c-ce15-46dc-af12-7d6fcd023254.webp'),(109,'דולומיטים','  - רכיבת אופניים מהרי הדולומיטים לונציה - בולצאנו ונופי הרי הדולומיטים שייט באגם גרדה רכיבה דרך יקבי היין המפורסמים של צפון איטליה פדובה ויצ\'נזה ונציה- הדובדבן שבקצפת','2024-08-01','2024-08-08',2000.00,'6fb8b80c-f4a0-4fab-8fbf-d4247c253d85.jpg'),(110,'ריין','לחוות את אחד הנהרות החשובים ביותר באירופה.   •מסלולי אופניים מעולים המתאימים לכל אחד, רכיבה מישורית ורגועה בין עיירות וכפרים.   • ','2024-10-06','2024-10-13',2222.00,'f3612da7-3efa-4f21-bf9a-ff56fdb64c20.jpg'),(111,'ויטנאם','טיול אתגרי באיזורים מרהיבים בצפון ויאטנם, מתאים לרוכבים מיומנים. בטיול תפגשו בני מיעוטים שחיים באיזורים אילו שבהם נראה כאילו הזמן עמד מלכת.','2024-08-29','2025-01-07',3004.00,'b82cd098-0fa1-4d82-9b86-f9a68390dce3.jpeg'),(112,'קמינו דה קומפוסטלה','דרך הצליינים המפורסמת מתחילה בחוף הצפוני של פורטוגל, חוצה כפרים קטנים ועיירות עם עבר מפואר, מטבח עשיר ויינות משובחים. ','2024-08-01','2024-09-07',2000.00,'f87e6b97-a452-42ad-b78e-a2979951b7ae.jpeg'),(113,'שוויץ','טיול אידיאלי למשפחות, ברובו מישורי. במהלך הטיול תיהנו מרכיבה נינוחה בדרך המגוונת של מרכז שוויץ, תטיילו בהנאה דרך שטחים חקלאיים ומישורים רחבים, לאורך אגמים יפיפיים','2024-06-29','2024-07-06',1600.00,'802fb4de-8713-4a15-bf5b-f74d21581d83.jpg'),(114,'עמק הלואר','עושר תרבותי, קסם כפרי וארכיטקטורה רומנטית: שלושת אלה מתארים בצורה הטובה ביותר את טיול רכיבת האופנים בעמק הלואר שבצרפת. הקסם הכפרי והרומנטי של האזור הוא אחד המאפיינים של חבל הארץ הנהדר הזה.','2024-11-08','2024-10-15',2000.00,'8e1081fd-577d-4e77-b435-7e35877841d2.jpg'),(115,'דנובה','מסלול מישורי, לאורך הנהר, ואין צורך בכושר גופני גבוה או במיומנויות מיוחדות כדי לצלוח אותו. הרכיבה נעשית בשבילי אופניים מסודרים, ריקים מכלי רכב. חלק קטן מהמסלול עובר בכבישים קטנים ושקטים. ','2024-09-22','2024-09-29',1799.00,'be7a8dc9-53ba-437a-8c37-8418b7d4b13b.jpg'),(116,'זלצבורג','זלצבורג מדהימה! אפשר להעביר שבוע שלם רק בעיר הנפלאה הזו, עיר מגוריו של מוצארט. בתי קפה, אפל שטרודל ומוצארט קוגלן הם פה עניין שבשגרה ופשוט חובה לשלב אותם בין הסיורים בעיר העתיקה.','2024-10-23','2024-10-15',1999.00,'92040dd4-dcd2-4549-ab14-c9367cd33f1c.jpg'),(117,'יפן','טיול שמשלב רכיבה, סיפורים על תרבות יפן, הזן בודהיזם שינטו וכל מה שביניהם. • תקופת השלכת המרהיבה והצבעונית ביפן. • הנופים עוצרי הנשימה בשרשרת הרי האלפים היפניים נצבעים בצהוב, כתום ואדום.','2024-09-30','2024-10-08',5000.00,'5ae4c992-325c-4f6b-915e-823dcf1f2a45.jpg'),(118,'נפאל','לרכוב בארץ הרי ההימליה הגבוהים בעולם מעל 8000 מ, שממלאים את הנוף מהשביל ועד לרקיע. • הנופים עוצרי הנשימה בשרשרת הרי ההימליה כשרכס האנפורנה מתרומם מולנו.','2024-12-16','2024-12-30',4998.00,'a430bc8a-74b2-47fe-93f2-c8d60de4b605.jpg'),(126,' 4מעודכן קריביים','2יופי טופי של חופשה מוצלח ','2024-08-02','2024-08-23',999.00,'0a2c60f9-0f2d-4e8c-a986-5a2cffe8ce39.jpg'),(131,'ישראל','יופי טופי של חופשה','2024-08-23','2024-08-28',1000.00,'b617403f-ec4e-4d1f-aa81-155e2c82c32b.jpg'),(147,'בדיקה בדיקה','בדיקה רק בעברית','2024-09-06','2024-09-12',1000.00,'8bf1ea3e-c4c7-4e73-baed-551503983042.jpeg');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `destinationId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`destinationId`,`userId`),
  KEY `destinationId_idx` (`destinationId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `destinationId` FOREIGN KEY (`destinationId`) REFERENCES `destinations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (109,15),(109,17),(109,22),(109,23),(110,13),(111,13),(111,15),(111,17),(112,15),(112,17),(112,22),(113,15),(113,17),(113,22),(116,17),(126,17);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(145) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `FK_Users_Roles_idx` (`roleId`),
  CONSTRAINT `FK_Users_Roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'haya','karl','israel@gmail.com','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db',2),(15,'haya','karl','khaya@gmail.com','cfcdf6ce92d96b7dc620ba487bd4105c7a80ecf6199f4a79127cecd44a97d324325e126966e9ecc652228d6fe056c5cbb9cc5aa8a4c9931c6bd86fb1b6ea9b6d',1),(16,'israel','israely','ishy@gmail.com','01053efa6d8d797aef6183ae6dbf64ad91c76ad9c03e65a75024cab941478711c755ccb93328f084aace165bef7f12058d7394ab9a129fb9efa3e7eb7538502e',2),(17,'haim','cohen','haim@gmail.com','cfcdf6ce92d96b7dc620ba487bd4105c7a80ecf6199f4a79127cecd44a97d324325e126966e9ecc652228d6fe056c5cbb9cc5aa8a4c9931c6bd86fb1b6ea9b6d',2),(22,'haya','cohen','cohen@gmail.com','cfcdf6ce92d96b7dc620ba487bd4105c7a80ecf6199f4a79127cecd44a97d324325e126966e9ecc652228d6fe056c5cbb9cc5aa8a4c9931c6bd86fb1b6ea9b6d',2),(23,'dany','din','danDin@gmail.com','cfcdf6ce92d96b7dc620ba487bd4105c7a80ecf6199f4a79127cecd44a97d324325e126966e9ecc652228d6fe056c5cbb9cc5aa8a4c9931c6bd86fb1b6ea9b6d',2),(24,'dany','din','danDinf@gmail.com','cfcdf6ce92d96b7dc620ba487bd4105c7a80ecf6199f4a79127cecd44a97d324325e126966e9ecc652228d6fe056c5cbb9cc5aa8a4c9931c6bd86fb1b6ea9b6d',2),(25,'dany','din','danDinb@gmail.com','cfcdf6ce92d96b7dc620ba487bd4105c7a80ecf6199f4a79127cecd44a97d324325e126966e9ecc652228d6fe056c5cbb9cc5aa8a4c9931c6bd86fb1b6ea9b6d',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-07 21:39:44
