import sys
import os
import random
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from services.db_service import db_service
from dotenv import load_dotenv

load_dotenv()

TEST_CLASSES = ["8", "9", "10"]
SUBJECTS = ["Maths", "Science", "English", "History", "Physics"]

# Realistic Indian student names
STUDENTS_PER_CLASS = [
    ("Rahul", "Sharma"), ("Priya", "Verma"), ("Amit", "Gupta"), ("Anjali", "Singh"),
    ("Suresh", "Patel"), ("Meera", "Reddy"), ("Vikram", "Iyer"), ("Sita", "Nair"),
    ("Arjun", "Das"), ("Kavita", "Joshi"), ("Sneha", "Kumar"), ("Rohan", "Gupta"),
    ("Pooja", "Das"), ("Karan", "Sharma"), ("Aarti", "Verma"), ("Deepak", "Singh"),
    ("Nisha", "Patel"), ("Ravi", "Reddy"), ("Geeta", "Iyer"), ("Sanjay", "Nair"),
    ("Lakshmi", "Das"), ("Arun", "Joshi"), ("Divya", "Kumar"), ("Manish", "Gupta"),
    ("Rekha", "Sharma"), ("Vijay", "Verma"), ("Sunita", "Singh"), ("Mahesh", "Patel"),
    ("Anita", "Reddy"), ("Girish", "Iyer"), ("Padma", "Nair"), ("Sunil", "Das"),
    ("Kamala", "Joshi"), ("Rajesh", "Kumar"), ("Shobha", "Gupta"), ("Prasad", "Sharma"),
    ("Usha", "Verma"), ("Mohan", "Singh"), ("Savita", "Patel"), ("Ganesh", "Reddy"),
    ("Radha", "Iyer"), ("Krishna", "Nair"), ("Lalitha", "Das"), ("Naresh", "Joshi"),
    ("Saranya", "Kumar"), ("Dinesh", "Gupta"), ("Suma", "Sharma"), ("Harish", "Verma"),
    ("Asha", "Singh"), ("Balaji", "Patel"),
]

def seed_data():
    print("--- Initializing SQLite Database & Tables ---")
    db_service.init_db()

    print("--- Clearing existing data ---")
    db_service.execute_query("DELETE FROM exams")
    db_service.execute_query("DELETE FROM tests")
    db_service.execute_query("DELETE FROM attendance")
    db_service.execute_query("DELETE FROM students")

    # Generate 150 Students (Roll 1-50 for EACH class 8, 9, 10)
    print("--- Generating 150 Students (Roll 1-50 per class) ---")
    students = []
    student_args = []

    for cls in TEST_CLASSES:
        for roll_i in range(1, 51):
            roll = str(roll_i)
            first, last = STUDENTS_PER_CLASS[roll_i - 1]
            name = f"{first} {last}"
            students.append({"roll": roll, "class": cls, "name": name})
            student_args.append((roll, cls, name))

    db_service.execute_many(
        "INSERT INTO students (roll_no, class_name, name) VALUES (%s, %s, %s)",
        student_args,
    )

    # --- Date windows ---
    today = datetime.now().date()
    start_date = today - timedelta(days=180)  # 6 months ago

    attendance_args = []
    test_args = []
    exam_args = []

    print("--- Generating 6 Months of Realistic Records for all 150 students ---")

    for s in students:
        roll = s["roll"]
        cls = s["class"]

        # ── Attendance: every day from start_date to today ──────────────────
        current = start_date
        while current <= today:
            # Skip Sundays (weekday 6) — no school
            if current.weekday() != 6:
                # 85% present rate, slightly lower in rainy months (Jul/Aug)
                if current.month in [7, 8]:
                    present_prob = 0.78
                else:
                    present_prob = 0.87
                status = "Present" if random.random() < present_prob else "Absent"
                attendance_args.append((roll, cls, current.strftime("%Y-%m-%d"), status))
            current += timedelta(days=1)

        # ── Weekly Tests: one test per subject per ~4 weeks ─────────────────
        # Generate a test every ~14 days, cycling through subjects
        test_date = start_date + timedelta(days=random.randint(3, 7))
        subject_cycle = SUBJECTS * 8  # enough to cover 6 months
        random.shuffle(subject_cycle)

        test_count = 0
        while test_date <= today and test_count < len(subject_cycle):
            subj = subject_cycle[test_count]
            # Realistic marks distribution: most students score 50-95
            marks = round(random.gauss(70, 15), 1)
            marks = max(30.0, min(100.0, marks))  # clamp to 30-100
            test_args.append((roll, cls, test_date.strftime("%Y-%m-%d"), subj, round(marks, 1)))
            test_count += 1
            test_date += timedelta(days=random.randint(10, 16))  # test every ~2 weeks

        # ── Ensure this week has at least 2 tests ───────────────────────────
        week_start = today - timedelta(days=today.weekday())  # Monday
        for extra_subj in random.sample(SUBJECTS, 2):
            t_day = week_start + timedelta(days=random.randint(0, min(4, (today - week_start).days)))
            marks = round(random.gauss(68, 13), 1)
            marks = max(30.0, min(100.0, marks))
            test_args.append((roll, cls, t_day.strftime("%Y-%m-%d"), extra_subj, round(marks, 1)))

        # ── Exams: 3 term exams spread across 6 months ──────────────────────
        exam_offsets = [45, 105, 160]  # ~mid-term, end-term
        for offset in exam_offsets:
            e_date = start_date + timedelta(days=offset)
            if e_date <= today:
                for subj in random.sample(SUBJECTS, random.randint(2, 4)):
                    marks = round(random.gauss(65, 18), 1)
                    marks = max(25.0, min(100.0, marks))
                    exam_args.append((roll, cls, e_date.strftime("%Y-%m-%d"), subj, round(marks, 1)))

    print("--- Writing data to SQLite ---")
    db_service.execute_many(
        "INSERT INTO attendance (roll_no, class_name, date, status) VALUES (%s, %s, %s, %s)",
        attendance_args,
    )
    db_service.execute_many(
        "INSERT INTO tests (roll_no, class_name, date, subject, marks) VALUES (%s, %s, %s, %s, %s)",
        test_args,
    )
    db_service.execute_many(
        "INSERT INTO exams (roll_no, class_name, date, subject, marks) VALUES (%s, %s, %s, %s, %s)",
        exam_args,
    )

    # Summary counts
    total_att = len(attendance_args)
    total_tests = len(test_args)
    total_exams = len(exam_args)

    print(
        f"\n✅ SUCCESS! Data seeded into SQLite:\n"
        f"   Students : 150 (Roll 1-50, Classes 8/9/10)\n"
        f"   Attendance: {total_att:,} records (Mar-Sep, excl. Sundays)\n"
        f"   Tests    : {total_tests:,} records (bi-weekly, incl. THIS week)\n"
        f"   Exams    : {total_exams:,} records (3 term exams)\n"
    )


if __name__ == "__main__":
    seed_data()
