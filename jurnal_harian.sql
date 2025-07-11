-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 11, 2025 at 05:15 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jurnal_harian`
--

-- --------------------------------------------------------

--
-- Table structure for table `jurnal`
--

CREATE TABLE `jurnal` (
  `id` int NOT NULL,
  `pengguna_id` int NOT NULL,
  `tanggal` date NOT NULL,
  `keterangan` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jurnal`
--

INSERT INTO `jurnal` (`id`, `pengguna_id`, `tanggal`, `keterangan`) VALUES
(1, 1, '2024-12-01', 'semangatt'),
(2, 2, '2024-12-01', NULL),
(3, 1, '2024-12-02', NULL),
(4, 2, '2024-12-02', NULL),
(5, 1, '2024-12-10', NULL),
(6, 1, '2024-12-12', NULL),
(7, 2, '2024-12-24', NULL),
(8, 1, '2024-12-27', NULL),
(9, 2, '2024-12-27', NULL),
(10, 2, '2025-01-02', NULL),
(11, 1, '2025-01-03', NULL),
(12, 1, '2025-01-04', NULL),
(13, 2, '2025-01-05', NULL),
(14, 2, '2025-01-06', NULL),
(15, 1, '2025-01-10', NULL),
(16, 2, '2025-01-10', NULL),
(17, 1, '2025-01-12', NULL),
(18, 2, '2025-01-13', NULL),
(19, 1, '2025-02-02', NULL),
(20, 2, '2025-02-02', NULL),
(21, 1, '2025-02-04', NULL),
(22, 2, '2025-02-05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jurnal_kegiatan`
--

CREATE TABLE `jurnal_kegiatan` (
  `id` int NOT NULL,
  `jurnal_id` int NOT NULL,
  `kegiatan_id` int NOT NULL,
  `kuantitas` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jurnal_kegiatan`
--

INSERT INTO `jurnal_kegiatan` (`id`, `jurnal_id`, `kegiatan_id`, `kuantitas`) VALUES
(1, 1, 1, 3),
(2, 1, 2, 20),
(3, 1, 3, 10),
(4, 1, 4, 30),
(5, 2, 5, 3),
(6, 2, 6, 1),
(7, 2, 7, 10),
(8, 2, 8, 20),
(9, 2, 9, 10),
(10, 2, 10, 15),
(11, 3, 1, 4),
(12, 3, 2, 20),
(13, 3, 3, 20),
(14, 3, 4, 20),
(15, 4, 5, 2),
(16, 4, 6, 2),
(17, 4, 7, 20),
(18, 4, 8, 30),
(19, 4, 9, 13),
(20, 4, 10, 16),
(21, 5, 1, 4),
(22, 5, 2, 20),
(23, 5, 3, 20),
(24, 5, 4, 20),
(25, 6, 1, 4),
(26, 6, 2, 20),
(27, 6, 3, 20),
(28, 6, 4, 10),
(29, 7, 5, 1),
(30, 7, 6, 1),
(31, 7, 7, 24),
(32, 7, 8, 40),
(33, 7, 9, 16),
(34, 7, 10, 16),
(35, 8, 1, 6),
(36, 8, 2, 30),
(37, 8, 3, 15),
(38, 8, 4, 5),
(39, 9, 5, 4),
(40, 9, 6, 2),
(41, 9, 7, 30),
(42, 9, 8, 40),
(43, 9, 9, 20),
(44, 9, 10, 20),
(45, 10, 5, 3),
(46, 10, 6, 3),
(47, 10, 7, 32),
(48, 10, 8, 40),
(49, 10, 9, 20),
(50, 10, 10, 20),
(51, 11, 1, 5),
(52, 11, 2, 25),
(53, 11, 3, 20),
(54, 11, 4, 10),
(55, 12, 1, 4),
(56, 12, 2, 30),
(57, 12, 3, 30),
(58, 12, 4, 30),
(59, 13, 5, 4),
(60, 13, 6, 2),
(61, 13, 7, 40),
(62, 13, 8, 40),
(63, 13, 9, 25),
(64, 13, 10, 25),
(65, 14, 5, 4),
(66, 14, 6, 2),
(67, 14, 7, 35),
(68, 14, 8, 30),
(69, 14, 9, 35),
(70, 14, 10, 35),
(71, 15, 1, 4),
(72, 15, 2, 30),
(73, 15, 3, 30),
(74, 15, 4, 30),
(75, 16, 5, 4),
(76, 16, 6, 2),
(77, 16, 7, 30),
(78, 16, 8, 30),
(79, 16, 9, 30),
(80, 16, 10, 30),
(81, 17, 1, 2),
(82, 17, 2, 30),
(83, 17, 3, 30),
(84, 17, 4, 30),
(85, 18, 5, 3),
(86, 18, 6, 1),
(87, 18, 7, 35),
(88, 18, 8, 35),
(89, 18, 9, 35),
(90, 18, 10, 35),
(91, 19, 1, 4),
(92, 19, 2, 35),
(93, 19, 3, 20),
(94, 19, 4, 40),
(95, 20, 5, 4),
(96, 20, 6, 2),
(97, 20, 7, 40),
(98, 20, 8, 40),
(99, 20, 9, 40),
(100, 20, 10, 40),
(101, 21, 1, 2),
(102, 21, 2, 30),
(103, 21, 3, 20),
(104, 21, 4, 30),
(105, 22, 5, 4),
(106, 22, 6, 2),
(107, 22, 7, 40),
(108, 22, 8, 40),
(109, 22, 9, 40),
(110, 22, 10, 40);

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` int NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `satuan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pengguna_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama`, `satuan`, `pengguna_id`) VALUES
(1, 'Tadarus', 'halaman', 1),
(2, 'Lari', 'menit', 1),
(3, 'Baca buku', 'menit', 1),
(4, 'Menulis', 'menit', 1),
(5, 'Lari', 'Km', 2),
(6, 'Belajar ngoding', 'jam', 2),
(7, 'Push Up', 'kali', 2),
(8, 'Jalan', 'menit', 2),
(9, 'Sit Up', 'kali', 2),
(10, 'Squat', 'kali', 2),
(11, 'Mengajar', 'jam', 1),
(12, 'Mengajar', 'jam', 1);

-- --------------------------------------------------------

--
-- Table structure for table `log_aktivitas`
--

CREATE TABLE `log_aktivitas` (
  `id` int NOT NULL,
  `pengguna_id` int DEFAULT NULL,
  `aktivitas` varchar(255) DEFAULT NULL,
  `waktu` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id`, `nama`, `email`, `password`) VALUES
(1, 'Wahid', 'wahid@email.com', '2b1ddf586a8155d1b59c26c087128380'),
(2, 'Senayan', 'senayan@email.com', '2fa7e5b9c0fb3611907c1d11fb4837de'),
(3, 'ntis', 'ntis@gmail.com', 'ntis');

-- --------------------------------------------------------

--
-- Table structure for table `pengingat`
--

CREATE TABLE `pengingat` (
  `id` int NOT NULL,
  `pengguna_id` int DEFAULT NULL,
  `pesan` varchar(255) DEFAULT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` enum('aktif','selesai') DEFAULT 'aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pengingat`
--

INSERT INTO `pengingat` (`id`, `pengguna_id`, `pesan`, `waktu`, `status`) VALUES
(1, NULL, NULL, NULL, 'aktif'),
(2, 1, 'gass', NULL, 'aktif');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jurnal_kegiatan`
--
ALTER TABLE `jurnal_kegiatan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jurnal_id` (`jurnal_id`,`kegiatan_id`,`kuantitas`),
  ADD KEY `kegiatan_id` (`kegiatan_id`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengguna_id` (`pengguna_id`);

--
-- Indexes for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengguna_id` (`pengguna_id`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengingat`
--
ALTER TABLE `pengingat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengguna_id` (`pengguna_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jurnal`
--
ALTER TABLE `jurnal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `jurnal_kegiatan`
--
ALTER TABLE `jurnal_kegiatan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pengingat`
--
ALTER TABLE `pengingat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jurnal_kegiatan`
--
ALTER TABLE `jurnal_kegiatan`
  ADD CONSTRAINT `jurnal_kegiatan_ibfk_1` FOREIGN KEY (`jurnal_id`) REFERENCES `jurnal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnal_kegiatan_ibfk_2` FOREIGN KEY (`kegiatan_id`) REFERENCES `kegiatan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD CONSTRAINT `kegiatan_ibfk_1` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  ADD CONSTRAINT `log_aktivitas_ibfk_1` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`);

--
-- Constraints for table `pengingat`
--
ALTER TABLE `pengingat`
  ADD CONSTRAINT `pengingat_ibfk_1` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
