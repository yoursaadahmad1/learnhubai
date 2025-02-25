-- Create ENUM type for user roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role user_role DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ensure updated_at updates on change
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to tables needing updated_at updates
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  image_url text,
  duration text,
  level text CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger for courses
CREATE TRIGGER update_courses_timestamp
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress integer DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_enrollments_timestamp
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL CHECK (amount >= 0),
  stripe_payment_id text,
  status text CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create instructor applications table
CREATE TABLE IF NOT EXISTS instructor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  expertise text[],
  experience text,
  status text CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_applications_timestamp
BEFORE UPDATE ON instructor_applications
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_applications ENABLE ROW LEVEL SECURITY;

-- Security Policies
-- Allow users to read their own data
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow instructors to manage their own courses (but not delete them)
CREATE POLICY "Instructors can manage own courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (instructor_id = auth.uid());

-- Allow users to view all courses
CREATE POLICY "Users can view courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to enroll only themselves in courses
CREATE POLICY "Users can enroll in courses"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Allow users to read their enrollments
CREATE POLICY "Users can read own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Allow users to update their enrollments (but not others)
CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Allow users to view their payments
CREATE POLICY "Users can view their payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Allow users to apply as instructors
CREATE POLICY "Users can apply as instructors"
  ON instructor_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Allow users to update their own applications
CREATE POLICY "Users can update own applications"
  ON instructor_applications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

