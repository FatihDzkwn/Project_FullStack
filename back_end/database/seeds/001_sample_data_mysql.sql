-- ============================================================================
-- DATABASE SEEDS - Sample Data (MySQL)
-- ============================================================================
-- 
-- Insert sample data untuk testing
-- 
-- Usage:
-- mysql -u root -p sky_booking < database/seeds/001_sample_data.sql
-- 
-- ============================================================================

-- ============================================================================
-- INSERT AIRLINES
-- ============================================================================

INSERT INTO airlines (airline_code, airline_name, country, total_aircraft) VALUES
('GA', 'Garuda Indonesia', 'Indonesia', 145),
('BA', 'British Airways', 'United Kingdom', 280),
('SQ', 'Singapore Airlines', 'Singapore', 150),
('QF', 'Qantas Airways', 'Australia', 125),
('EK', 'Emirates', 'United Arab Emirates', 260),
('AI', 'Air India', 'India', 200),
('AF', 'Air France', 'France', 220),
('LH', 'Lufthansa', 'Germany', 260);

-- ============================================================================
-- INSERT AIRPORTS
-- ============================================================================

INSERT INTO airports (airport_code, airport_name, city, country, timezone) VALUES
('CGK', 'Soekarno-Hatta International Airport', 'Jakarta', 'Indonesia', 'Asia/Jakarta'),
('DPS', 'Ngurah Rai International Airport', 'Bali', 'Indonesia', 'Asia/Jakarta'),
('JOG', 'Adisumarmo International Airport', 'Yogyakarta', 'Indonesia', 'Asia/Jakarta'),
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore', 'Asia/Singapore'),
('KUL', 'Kuala Lumpur International Airport', 'Kuala Lumpur', 'Malaysia', 'Asia/Kuala_Lumpur'),
('BKK', 'Suvarnabhumi Airport', 'Bangkok', 'Thailand', 'Asia/Bangkok'),
('SYD', 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia', 'Australia/Sydney'),
('LHR', 'London Heathrow Airport', 'London', 'United Kingdom', 'Europe/London'),
('AMS', 'Amsterdam Airport Schiphol', 'Amsterdam', 'Netherlands', 'Europe/Amsterdam'),
('CDG', 'Paris Charles de Gaulle Airport', 'Paris', 'France', 'Europe/Paris');

-- ============================================================================
-- INSERT FLIGHTS (Sample - CGK to DPS)
-- ============================================================================

INSERT INTO flights (flight_number, airline_id, departure_airport, arrival_airport, 
                     departure_time, arrival_time, duration_minutes, aircraft_type, 
                     total_seats, available_seats, economy_price, business_price, 
                     first_class_price, flight_date, status) VALUES

-- Garuda Indonesia
('GA101', 1, 1, 2, '2026-04-20 07:00:00', '2026-04-20 09:00:00', 120, 'Boeing 777', 350, 45, 1500000, 3500000, 5000000, '2026-04-20', 'scheduled'),
('GA102', 1, 1, 2, '2026-04-20 15:00:00', '2026-04-20 17:00:00', 120, 'Boeing 737', 200, 30, 1200000, 2800000, 4000000, '2026-04-20', 'scheduled'),

-- Lion Air
('JT101', 2, 1, 2, '2026-04-20 08:30:00', '2026-04-20 10:30:00', 120, 'Boeing 737', 189, 120, 800000, 2000000, 3000000, '2026-04-20', 'scheduled'),
('JT102', 2, 1, 2, '2026-04-20 16:00:00', '2026-04-20 18:00:00', 120, 'Airbus A320', 180, 90, 850000, 2100000, 3200000, '2026-04-20', 'scheduled'),

-- Singapore Airlines
('SQ106', 3, 1, 2, '2026-04-20 09:00:00', '2026-04-20 11:00:00', 120, 'Boeing 787', 250, 60, 2000000, 4500000, 6500000, '2026-04-20', 'scheduled'),

-- Return flights (DPS to CGK)
('GA201', 1, 2, 1, '2026-04-25 10:00:00', '2026-04-25 12:00:00', 120, 'Boeing 777', 350, 40, 1500000, 3500000, 5000000, '2026-04-25', 'scheduled'),
('JT201', 2, 2, 1, '2026-04-25 11:30:00', '2026-04-25 13:30:00', 120, 'Boeing 737', 189, 100, 800000, 2000000, 3000000, '2026-04-25', 'scheduled'),
('SQ206', 3, 2, 1, '2026-04-25 12:00:00', '2026-04-25 14:00:00', 120, 'Boeing 787', 250, 55, 2000000, 4500000, 6500000, '2026-04-25', 'scheduled');

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

SELECT 'Sample data inserted successfully!' as status;
