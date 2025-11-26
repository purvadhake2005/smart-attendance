# Smart Attendance System using QR Code

A modern, web-based attendance management system that uses QR codes for quick and efficient student attendance tracking.

## Features

### 📋 Admin Panel
- **Register Students**: Add new students with ID, name, and email
- **Generate QR Codes**: Create unique QR codes for each student
- **Download QR Codes**: Download QR codes as PNG images for printing
- **Manage Students**: Edit or delete student records
- **View All Students**: See list of all registered students

### 📱 QR Code Scanner
- **Real-time Scanning**: Use device camera to scan QR codes
- **Instant Feedback**: See immediate confirmation of attendance marking
- **Duplicate Prevention**: Automatically prevent marking same student twice on same day
- **Start/Stop Controls**: Easy camera control buttons

### 📊 Attendance Report
- **View All Records**: Complete attendance history with all details
- **Statistics Dashboard**: 
  - Total attendance records
  - Number of unique students
  - Today's attendance count
- **Advanced Filtering**:
  - Filter by date
  - Filter by student
  - Combine multiple filters
- **Export Options**:
  - Export as CSV (Excel compatible)
  - Export as Text Report (formatted by date)
- **Data Management**:
  - Delete individual records
  - Clear all records with confirmation

### 👤 Student Records
- **Individual Student View**: Select any student to see their complete attendance history
- **Student Information Card**: Display student ID, name, email, and total days present
- **Attendance Timeline**: View all check-ins for selected student
- **Export Student Data**: Download individual student's attendance record as CSV

## How to Use

### 1. Register a Student
1. Go to **Admin Panel** tab
2. Enter Student ID, Name, and Email
3. Click **"Generate QR Code"**
4. A QR code will be generated for the student
5. Click **"Download QR Code"** to save it
6. Student will appear in the "All Students" list

### 2. Scan Attendance
1. Go to **Scan QR** tab
2. Click **"Start Camera"**
3. Point camera at student's QR code
4. System will automatically detect and mark attendance
5. See confirmation message with student details
6. Click **"Stop Camera"** to finish

### 3. View Attendance Report
1. Go to **Attendance Report** tab
2. See statistics at the top
3. View all records in the table
4. Use date picker to filter by specific date
5. Use student dropdown to filter by specific student
6. Click **"Reset Filters"** to see all records
7. Export data as CSV or formatted report

### 4. View Student Records
1. Go to **Student Records** tab
2. Select a student from the dropdown
3. View their complete attendance history
4. See total days present in the information card
5. Delete individual records if needed
6. Export student's complete record as CSV

## Data Storage

- All data is stored locally in your browser using localStorage
- Data persists even after closing the browser
- No internet connection required after initial load
- All data is private and stays on your device

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Camera/webcam for QR code scanning
- JavaScript enabled

## Features of Each Section

### Admin Panel
- ✅ Add/Edit/Delete students
- ✅ Generate unique QR codes
- ✅ Download QR codes for printing
- ✅ View all registered students

### Scan QR
- ✅ Real-time QR code detection
- ✅ Automatic attendance marking
- ✅ Duplicate prevention
- ✅ Instant confirmation feedback

### Attendance Report
- ✅ Complete attendance history
- ✅ Statistics dashboard
- ✅ Multi-level filtering
- ✅ CSV export
- ✅ Text report export
- ✅ Individual record deletion
- ✅ Clear all data option

### Student Records
- ✅ Student information card
- ✅ Complete attendance history per student
- ✅ Total presence count
- ✅ Delete individual records
- ✅ Export student CSV

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **QR Code Generation**: QRCode.js library
- **QR Code Scanning**: jsQR library
- **Storage**: Browser localStorage API
- **No Backend Required**: Runs completely in the browser

## File Structure

```
Smart attendance system/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── app.js          # JavaScript logic
└── README.md       # This file
```

## Tips for Best Results

1. **QR Code Placement**: Print QR codes clearly and attach to student ID cards
2. **Lighting**: Ensure good lighting when scanning QR codes
3. **Distance**: Hold device 6-12 inches away from QR code for optimal scanning
4. **Regular Backups**: Export attendance data regularly as backup
5. **Data Management**: Clear old records periodically to keep system fast

## Troubleshooting

### Camera not working?
- Check browser permissions for camera access
- Ensure camera is not being used by another application
- Try refreshing the page

### QR Code not scanning?
- Ensure QR code is clear and not damaged
- Check lighting conditions
- Try scanning from different angle
- Ensure camera is focused on QR code

### Data not saving?
- Check browser storage is not disabled
- Clear browser cache and try again
- Use a different browser

## License

This project is open source and free to use.

## Support

For issues or feature requests, please check the code or contact support.

---

**Version**: 1.0
**Last Updated**: November 2025
