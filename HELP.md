# Smart Attendance System - Complete Help Documentation

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Scanner Tab Guide](#scanner-tab-guide)
3. [Admin Panel Guide](#admin-panel-guide)
4. [Attendance Report Guide](#attendance-report-guide)
5. [Student Records Guide](#student-records-guide)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Getting Started

### **System Requirements**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Camera/webcam for scanning (optional - manual entry available)
- JavaScript enabled
- No internet required

### **Opening the System**
1. Open `index.html` in your web browser
2. You'll see 4 main tabs:
   - 📋 Admin Panel
   - 📱 Scan QR
   - 📊 Attendance Report
   - 👤 Student Records

### **First Time Setup**
1. Go to Admin Panel
2. Register at least one student
3. Generate and download QR codes
4. Go to Scan QR tab
5. Test the scanner with a QR code

---

## Scanner Tab Guide

### **🎥 QR Code Scanning (Recommended)**

**How It Works:**
1. Click **"🎥 Start Camera"** button
2. Browser asks for camera permission - Click **"Allow"**
3. Camera feed displays on screen
4. Hold QR code in front of camera (6-12 inches away)
5. System automatically detects and scans
6. Green confirmation message appears
7. Click **"⏹️ Stop Camera"** to finish

**Visual Indicators:**
- 🔵 Blue pulsing dot = System is actively scanning
- ✅ Green message = Success - attendance marked
- ❌ Red message = Error - check Student ID or try again

**Tips for Best Scanning:**
- Keep QR code steady
- Ensure good lighting (no shadows)
- Hold 6-12 inches away
- Don't move device around too much
- QR code should fill most of camera view

### **📤 Manual Entry (Alternative Method)**

**How It Works:**
1. Scroll down to "📤 Manual Entry" section
2. Enter the **Student ID** in the text field
3. Click **"Mark Attendance"** button
4. System finds student and marks attendance
5. See confirmation message

**When to Use:**
- Camera not available
- Student lost their ID card
- Camera permission denied
- Faster for bulk entry

**Example Student IDs:**
- `STU001`
- `12A-042`
- `S123`
- Any ID you created in Admin Panel

**Result Messages:**
- ✅ Green = Student found, attendance marked
- ❌ Red = Student not found or already marked today

### **📖 Instructions & Help**

Click **"❓ Help"** button to show/hide:
- Step-by-step instructions
- Best practices
- Tips and tricks
- Camera requirements

---

## Admin Panel Guide

### **👥 Register New Student**

**Steps:**
1. Click **"Admin Panel"** tab
2. Fill in the form:
   - **Student ID**: Unique identifier (e.g., `STU001`)
   - **Name**: Student's full name
   - **Email**: Student's email address
3. Click **"Generate QR Code"** button
4. QR code appears in the box below

**Student ID Best Practices:**
- Use consistent format: `CLASS-ROLLNO` (e.g., `12A-001`)
- Make IDs unique and memorable
- Use alphanumeric characters
- Avoid special characters

**Email Validation:**
- Must be valid email format
- Used for reports and records

### **🎫 Generate QR Code**

**How It Works:**
1. Enter student details
2. Click **"Generate QR Code"**
3. Unique QR code created for that student
4. Code encodes: `ID:VALUE|NAME:VALUE|EMAIL:VALUE`

**What's in the QR Code:**
- Student ID
- Student Name
- Student Email
- All required for attendance

### **⬇️ Download QR Code**

**Steps:**
1. After generating QR, click **"Download QR Code"**
2. Image saves to your downloads folder
3. Print the image
4. Attach to student ID card or document

**Printing Tips:**
- Use clear, bright colors
- Ensure code is not damaged
- Print on card stock if possible
- Laminate for durability

### **📋 Manage Students**

**View All Students:**
- Table shows all registered students
- Columns: ID, Name, Email, Actions

**Edit Student:**
1. Find student in table
2. Click **"Edit"** button
3. Fields populate with current data
4. Edit the information
5. Generate new QR code
6. Old record replaced

**Delete Student:**
1. Find student in table
2. Click **"Delete"** button
3. Confirm deletion
4. Student removed from system
5. Associated attendance records remain

---

## Attendance Report Guide

### **📊 Statistics Dashboard**

**Total Records:**
- Shows total number of attendance entries
- Updates when new attendance is marked

**Unique Students:**
- Number of different students marked present
- Counts each student once per day

**Today's Attendance:**
- Count of attendance marked today
- Resets at midnight
- Based on system date

### **👀 View Attendance Records**

**Table Columns:**
| Column | Information |
|--------|-------------|
| Student ID | Unique student identifier |
| Name | Student's full name |
| Email | Student's email address |
| Check-In Time | Exact time attendance marked |
| Date | Date of attendance |
| Status | Attendance status (always "Present") |
| Action | Delete button |

**Records Display:**
- Newest records first
- Sorted by date and time
- All fields populated automatically

### **🔍 Filter Options**

**Filter by Date:**
1. Click date picker
2. Select specific date
3. Table shows only that day's records
4. Statistics update

**Filter by Student:**
1. Click student dropdown
2. Select student name
3. Table shows only their records
4. Works with date filter too

**Combine Filters:**
1. Select a date
2. Select a student
3. See their attendance for that date
4. Perfect for checking specific entry

**Reset Filters:**
- Click **"Reset Filters"** button
- Returns to viewing all records
- Clears all filter selections

### **⬇️ Export Options**

**Export as CSV (Excel):**
1. Click **"Export CSV"** button
2. File downloads to computer
3. Open in Excel or Google Sheets
4. Format: Comma-separated values
5. All records included with full data

**Export as Text Report:**
1. Click **"Export Report"** button
2. Text file downloads
3. Human-readable format
4. Grouped by date
5. All student details included

**Exported Data Includes:**
- All student IDs
- All names and emails
- All check-in times
- All dates
- All statuses

### **🗑️ Data Management**

**Delete Individual Record:**
1. Find record in table
2. Click **"Delete"** button in Action column
3. Confirm deletion
4. Record removed permanently
5. Statistics update

**Clear All Records:**
1. Click **"Clear All"** button
2. Confirm you want to clear everything
3. All attendance records deleted
4. Statistics reset to zero
5. ⚠️ Cannot be undone!

---

## Student Records Guide

### **👤 Select Student**

**How to View:**
1. Click **"Student Records"** tab
2. Click dropdown - "Select a Student..."
3. List shows all students with attendance records
4. Choose a student
5. Their complete history displays

**Student Format:**
- Shown as: `Name (ID)`
- Example: `John Doe (STU001)`
- Easy to identify

### **📊 Student Information Card**

**Displays:**
- **Student Name**: Full name (in large text)
- **Student ID**: Unique identifier
- **Email**: Contact email address
- **Total Days Present**: Count of all attendance records

**Color Scheme:**
- Purple gradient background
- White text for easy reading
- Key stats highlighted

### **📅 Attendance History Table**

**Columns:**
| Column | Details |
|--------|---------|
| Date | Attendance date |
| Check-In Time | Exact time marked |
| Status | Attendance status |
| Action | Delete individual record |

**Features:**
- Chronological order (newest first)
- All records for selected student
- Can delete individual entries
- Updates automatically

### **⬇️ Export Student Record**

**How to Export:**
1. Select student from dropdown
2. Click **"Export Student Record"**
3. File downloads: `StudentName_attendance.csv`
4. Open in spreadsheet application

**Exported Information:**
- Student ID and name
- Email address
- Total days present
- Complete attendance history
- All dates and times

**File Format:**
- CSV (Excel compatible)
- Easy to import to other systems
- Maintains formatting

---

## Troubleshooting

### **Camera Issues**

**Problem: Camera won't start**
- Check browser permission for camera
- Go to browser settings → Camera → Allow this site
- Close other apps using camera
- Restart browser
- Try different browser

**Problem: Camera permission denied**
- Click browser address bar (left side)
- Find camera icon
- Click "Reset" or "Always allow"
- Refresh page and try again

**Problem: Black screen when camera opens**
- Poor lighting - move to brighter area
- Camera lens covered - clean it
- Camera not properly connected
- Try built-in camera instead of external

### **Scanning Issues**

**Problem: QR code won't scan**
- Ensure good lighting (not too dark)
- QR code not blurry or damaged
- Hold steady (6-12 inches away)
- Try different angles
- Zoom in closer or move back
- Use manual entry instead

**Problem: Scanning too slow**
- Improve lighting
- Clean camera lens
- Reduce glare on QR code
- Try higher contrast printout
- Ensure QR code is large enough

**Problem: "Student Not Found" error**
- Check Student ID is correct
- Register student in Admin Panel first
- Verify spelling of ID
- Make sure QR code matches registered student
- Use manual entry with correct ID

**Problem: "Already Marked" error**
- Student already marked attendance today
- Can only mark once per 24 hours
- Wait until next day to mark again
- Or delete old record if mistake

### **Data Issues**

**Problem: Data not saving**
- Check browser allows local storage
- Clear browser cache:
  - Settings → Privacy → Clear browsing data
  - Reload page
- Try different browser
- Check storage quota not full

**Problem: Data disappeared**
- Check if using private/incognito mode
  - (Data clears when window closes)
- Try opening in regular mode
- Browser cache cleared accidentally
- Storage quota exceeded

**Problem: Export not working**
- Check popup blocker - allow downloads
- Browser security settings - allow CSV
- Try different file format
- Try different browser
- Check internet connection

### **General Issues**

**Problem: Page won't load**
- Refresh page (F5 or Ctrl+R)
- Clear browser cache
- Try different browser
- Check JavaScript is enabled
- Ensure HTML file exists

**Problem: Buttons not responding**
- Refresh page
- Close browser and reopen
- Check JavaScript enabled
- Try different browser
- Check browser console for errors

---

## FAQ

### **Data & Storage**

**Q: Where is my data stored?**
A: In your browser's local storage on this device. Stays private, no cloud.

**Q: Is internet required?**
A: No - works completely offline. Internet only needed to load the page initially.

**Q: Is my data backed up?**
A: No - it's only on this device. Export data regularly as backup.

**Q: Can I access data on another computer?**
A: No - data is device-specific. Must export and transfer files manually.

**Q: What if I clear browser cache?**
A: Data will be lost. Always export before clearing cache.

**Q: How long does data stay?**
A: Until you clear browser storage or clear all records manually.

### **Scanning**

**Q: Why should I scan instead of manual entry?**
A: Faster, fewer mistakes, automatic data validation, no typing needed.

**Q: Can I scan on mobile?**
A: Yes - use phone camera to scan. Manual entry easier on mobile.

**Q: What's the best distance for scanning?**
A: 6-12 inches from QR code. Find the "sweet spot" for your device.

**Q: Can scanning work in low light?**
A: Difficult - use manual entry instead. Or improve lighting.

### **Attendance**

**Q: Can I mark attendance retroactively?**
A: Not automatically - use manual entry to mark past dates if system date set correctly.

**Q: Can a student be marked twice on same day?**
A: No - system prevents duplicates. One mark per student per day.

**Q: How do I mark attendance for absent students?**
A: This system marks present only. Absent tracking not built-in.

**Q: Can I edit attendance records?**
A: No - only delete and re-mark. Data immutability is intentional.

### **Reports**

**Q: What format is the CSV export?**
A: Standard CSV - works in Excel, Google Sheets, LibreOffice.

**Q: Can I import data from other systems?**
A: Not automatically - would need manual entry or Excel manipulation.

**Q: How do I share reports with others?**
A: Export as CSV or Text Report and send the file.

**Q: Can I schedule automatic exports?**
A: Not built-in - must export manually. Use browser scheduled tasks if needed.

### **Students**

**Q: How many students can I register?**
A: Hundreds - limited only by browser storage space.

**Q: Can I import student list?**
A: Not automatically - register manually in Admin Panel.

**Q: Can students edit their own records?**
A: No - Admin Panel only. System is admin-controlled.

**Q: How do I organize students by class?**
A: Use class code in Student ID (e.g., `12A-001`, `11B-042`).

### **Troubleshooting**

**Q: System is slow - why?**
A: Large attendance dataset. Export and clear old records.

**Q: Some features not working - why?**
A: Browser issue - try refreshing or different browser.

**Q: Will my data work on other devices?**
A: No - each device has separate storage. Export to transfer.

**Q: Can I backup data?**
A: Yes - Export CSV regularly and save files.

---

## Contact & Support

For technical issues or feature requests:
1. Check this documentation
2. Try troubleshooting section
3. Test in different browser
4. Clear cache and reload

For specific problems:
- Check browser console (F12) for error messages
- Ensure browser and JavaScript enabled
- Try system on different device

---

## Version Information

- **Version**: 1.0
- **Last Updated**: November 2025
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Platform**: Web-based, works on desktop and mobile

---

**Happy attendance tracking!** 📋✅
