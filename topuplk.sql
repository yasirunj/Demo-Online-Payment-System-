-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2020 at 10:55 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `topuplk`
--

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `AuthKey` varchar(40) NOT NULL,
  `ReferenceID` varchar(20) NOT NULL,
  `Amount` varchar(20) NOT NULL,
  `CardHolderName` varchar(30) NOT NULL,
  `CardNumber` varchar(20) NOT NULL,
  `TransStatus` varchar(10) NOT NULL DEFAULT 'n/a',
  `Response` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`AuthKey`, `ReferenceID`, `Amount`, `CardHolderName`, `CardNumber`, `TransStatus`, `Response`) VALUES
('0f4d67a6-3704-48de-8463-d11c1a64e7b5', '957180348', '19', 'K K Y N Jayathilaka', '4283562006899800', 'Approved', '101'),
('2b5cc042-11e4-4685-a3e3-bb95fc0fde66', '481056907', '100', 'G V K Priyanka', '4283562006899800', 'Diclined', '202'),
('2bce05e3-acc8-4762-a25f-70819e8f0c58', '777544344', '149', 'Yasiru', '4283562006899800', 'Approved', '303'),
('3884c92d-d2a3-43da-aa22-23ffb3ee3d7a', '698288551', '00', 'SIRIWARDANA', '4283562006899800', 'Approved', '101'),
('48fb2c6a-156a-4c77-a7b5-8775ef439a75', '447585747', '100', 'K K Y N Jayathilaka', '4283562006899800', 'Approved', '101'),
('6d3cb62d-7cc6-4d1e-82a8-863d867bd2d5', '778949575', '199', 'K K Y N Jayathilaka', '4283562006899800', 'Approved', '101'),
('8717fa97-ff4f-4b6e-92a4-6a01879de19b', '152796012', '100', 'G V K Priyanka', '4283980006899800', 'Diclined', '404'),
('a89f0c9f-8196-4a60-b6fc-951b3240464e', '861920952', '1000', 'K K N Jayathilaka', '4726580047984597', 'Approved', '101'),
('bbc0dc5f-9e5a-4481-9940-46daa326a4d6', '117166943', '129', 'K K Y N Jayathilaka', '4283562006899800', 'Approved', '101'),
('dd90ffc7-be5c-4ced-aabf-ab431aa30373', '861707646', '49', 'K K Y N Jayathilaka', '4283562006899800', 'Approved', '101');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`AuthKey`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
