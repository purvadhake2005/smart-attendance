// ============= Authentication =============
let users = [];
let currentUser = null;

// Load data from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadAuthData();
    checkIfLoggedIn();
    if (currentUser) {
        loadDataFromStorage();
        renderStudentsTable();
        setupTabNavigation();
        document.getElementById('currentUsername').textContent = currentUser.username;
    }
});

// Load authentication data
function loadAuthData() {
    const savedUsers = localStorage.getItem('smartAttendance_users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
    
    const loggedInUser = localStorage.getItem('smartAttendance_currentUser');
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
    }
}

// Save authentication data
function saveAuthData() {
    localStorage.setItem('smartAttendance_users', JSON.stringify(users));
}

// Check if user is logged in
function checkIfLoggedIn() {
    if (currentUser) {
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
    } else {
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
    }
}

// Switch between login and signup forms
function switchAuthForm(formType) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.remove('active');
    
    if (formType === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('loginError').textContent = '';
    } else {
        document.getElementById('signupForm').classList.add('active');
        document.getElementById('signupError').textContent = '';
    }
}

// Handle Login
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    if (!username || !password) {
        errorDiv.textContent = '❌ Please enter username and password';
        return;
    }
    
    const user = users.find(u => u.username === username);
    if (!user) {
        errorDiv.textContent = '❌ Username not found';
        return;
    }
    
    if (user.password !== password) {
        errorDiv.textContent = '❌ Incorrect password';
        return;
    }
    
    currentUser = user;
    localStorage.setItem('smartAttendance_currentUser', JSON.stringify(currentUser));
    errorDiv.textContent = '';
    
    // Load user-specific data
    loadDataFromStorage();
    renderStudentsTable();
    setupTabNavigation();
    document.getElementById('currentUsername').textContent = currentUser.username;
    
    checkIfLoggedIn();
}

// Handle Signup
function handleSignup() {
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    const errorDiv = document.getElementById('signupError');
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
        errorDiv.textContent = '❌ All fields are required';
        return;
    }
    
    if (username.length < 3) {
        errorDiv.textContent = '❌ Username must be at least 3 characters';
        return;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = '❌ Password must be at least 6 characters';
        return;
    }
    
    if (password !== confirmPassword) {
        errorDiv.textContent = '❌ Passwords do not match';
        return;
    }
    
    if (users.find(u => u.username === username)) {
        errorDiv.textContent = '❌ Username already exists';
        return;
    }
    
    if (users.find(u => u.email === email)) {
        errorDiv.textContent = '❌ Email already registered';
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toLocaleDateString()
    };
    
    users.push(newUser);
    saveAuthData();
    
    errorDiv.textContent = '';
    errorDiv.style.color = '#28a745';
    errorDiv.textContent = '✅ Account created! Please login.';
    
    setTimeout(() => {
        document.getElementById('signupUsername').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupConfirmPassword').value = '';
        switchAuthForm('login');
        document.getElementById('loginUsername').value = username;
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }, 1500);
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('smartAttendance_currentUser');
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        switchAuthForm('login');
        checkIfLoggedIn();
    }
}

// ============= Data Management =============
let students = [];
let attendance = [];
let studentDatabase = [];  // Complete student database with notes
let currentEditingStudent = null;

// Setup Tab Navigation
function setupTabNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            // If attendance tab is opened, refresh the table
            if (tabName === 'attendance') {
                renderAttendanceTable();
                populateAttendanceFilters();
                updateAttendanceStats();
            }
            
            // If student records tab is opened, populate student filter
            if (tabName === 'student-records') {
                populateStudentFilter();
            }

            // If database tab is opened, render database
            if (tabName === 'database') {
                renderDatabaseTable();
            }
        });
    });
}

// ============= QR Code Generation =============
function generateQRCode() {
    const studentId = document.getElementById('studentId').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const studentEmail = document.getElementById('studentEmail').value.trim();

    if (!studentId || !studentName || !studentEmail) {
        alert('Please fill all fields');
        return;
    }

    // Check if student already exists
    const exists = students.some(s => s.id === studentId);
    if (exists) {
        alert('Student ID already exists!');
        return;
    }

    // Create student object
    const student = {
        id: studentId,
        name: studentName,
        email: studentEmail,
        qrData: `ID:${studentId}|NAME:${studentName}|EMAIL:${studentEmail}`
    };

    // Add to students array
    students.push(student);
    saveDataToStorage();

    // Generate QR Code
    const qrContainer = document.getElementById('qrContainer');
    qrContainer.innerHTML = ''; // Clear previous QR

    const qr = new QRCode(qrContainer, {
        text: student.qrData,
        width: 300,
        height: 300,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show download button
    document.getElementById('downloadBtn').style.display = 'block';

    // Clear form
    document.getElementById('studentId').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';

    // Update students table
    renderStudentsTable();

    alert('QR Code generated successfully!');
}

function downloadQRCode() {
    const canvas = document.querySelector('#qrContainer canvas');
    if (!canvas) {
        alert('Generate QR Code first');
        return;
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `qrcode_${new Date().getTime()}.png`;
    link.click();
}

// ============= QR Code Scanning =============
let video = null;
let scanning = false;

function startScanning() {
    const cameraContainer = document.getElementById('cameraContainer');
    const startScanBtn = document.getElementById('startScanBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');

    cameraContainer.style.display = 'block';
    startScanBtn.style.display = 'none';
    stopScanBtn.style.display = 'block';

    video = document.getElementById('video');
    scanning = true;

    // Request camera access
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            facingMode: 'environment',
            width: { ideal: 400 },
            height: { ideal: 400 }
        } 
    }).then(stream => {
        video.srcObject = stream;
        video.play();
        scanQRCode();
    }).catch(err => {
        alert('Unable to access camera: ' + err.message);
        stopScanning();
    });
}

function stopScanning() {
    scanning = false;
    const cameraContainer = document.getElementById('cameraContainer');
    const startScanBtn = document.getElementById('startScanBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');

    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }

    cameraContainer.style.display = 'none';
    startScanBtn.style.display = 'block';
    stopScanBtn.style.display = 'none';
}

function scanQRCode() {
    const canvas = document.getElementById('canvas');
    const canvasContext = canvas.getContext('2d');
    const video = document.getElementById('video');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const scanLoop = setInterval(() => {
        if (!scanning) {
            clearInterval(scanLoop);
            return;
        }

        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            handleQRScanResult(code.data);
            clearInterval(scanLoop);
            stopScanning();
        }
    }, 100);
}

// Handle QR image uploaded from file input
function handleImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            // Resize large images for performance
            const maxDim = 1000;
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
                const scale = Math.min(maxDim / w, maxDim / h);
                w = Math.round(w * scale);
                h = Math.round(h * scale);
            }

            canvas.width = w;
            canvas.height = h;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);

            // Show preview
            const preview = document.getElementById('uploadedPreview');
            if (preview) {
                preview.src = canvas.toDataURL();
                preview.style.display = 'block';
            }

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code && code.data) {
                    handleQRScanResult(code.data);
                } else {
                    const scanResult = document.getElementById('scanResult');
                    scanResult.style.display = 'block';
                    scanResult.classList.add('error');
                    scanResult.innerHTML = `\n+                        <h4>✗ QR Not Detected</h4>\n+                        <p>No QR code found in the uploaded image.</p>\n+                    `;
                }
            } catch (err) {
                alert('Error decoding image: ' + err.message);
            }
        };
        img.onerror = function() {
            alert('Failed to load the image file.');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Open decoded URL in a new tab/window
function openDecodedURL(url) {
    try {
        // Use window.open to open URL in a new tab
        window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
        // Fallback: navigate current window
        window.location.href = url;
    }
}

function handleQRScanResult(qrData) {
    const scanResult = document.getElementById('scanResult');
    const decodedDiv = document.getElementById('decodedText');
    const decodedContent = document.getElementById('decodedTextContent');

    // Show raw decoded text / URL
    if (decodedDiv && decodedContent) {
        decodedDiv.style.display = 'block';
        // If it's a URL, render clickable link
        const trimmed = (qrData || '').trim();
        const urlMatch = trimmed.match(/^https?:\/\//i);
        if (urlMatch) {
            // Render clickable link and an explicit Open button
            decodedContent.innerHTML = `
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <a href="${trimmed}" target="_blank" rel="noopener noreferrer">${trimmed}</a>
                    <button class="btn btn-primary btn-small" onclick="openDecodedURL('${trimmed.replace(/'/g, "\\'")}')">Open</button>
                </div>
            `;
        } else {
            // show as code/pre for readability
            decodedContent.textContent = trimmed;
        }
    }
    
    // Parse QR data
    const parts = qrData.split('|');
    const data = {};
    
    parts.forEach(part => {
        const [key, value] = part.split(':');
        if (key && value) {
            data[key.trim()] = value.trim();
        }
    });

    // Find student
    const student = students.find(s => s.id === data['ID']);

    if (student) {
        const today = new Date().toLocaleDateString();
        
        // Check if student already marked attendance today
        const alreadyMarked = attendance.some(record => 
            record.id === student.id && record.date === today
        );

        if (alreadyMarked) {
            scanResult.style.display = 'block';
            scanResult.classList.add('error');
            scanResult.innerHTML = `
                <h4>⚠️ Already Marked</h4>
                <p><strong>Student:</strong> ${student.name} (${student.id})</p>
                <p>Attendance already marked for today (${today})</p>
            `;
            return;
        }

        // Add attendance record
        const timestamp = new Date();
        const attendanceRecord = {
            id: student.id,
            name: student.name,
            email: student.email,
            checkInTime: timestamp.toLocaleTimeString(),
            date: timestamp.toLocaleDateString(),
            status: 'Present'
        };

        attendance.push(attendanceRecord);
        saveDataToStorage();

        // Show success message
        scanResult.style.display = 'block';
        scanResult.classList.remove('error');
        scanResult.innerHTML = `
            <h4>✓ Attendance Marked Successfully</h4>
            <p><strong>Student ID:</strong> ${student.id}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Check-In Time:</strong> ${attendanceRecord.checkInTime}</p>
            <p><strong>Date:</strong> ${attendanceRecord.date}</p>
        `;
    } else {
        scanResult.style.display = 'block';
        scanResult.classList.add('error');
        scanResult.innerHTML = `
            <h4>✗ Student Not Found</h4>
            <p>The scanned QR code doesn't match any registered student.</p>
            <p><strong>QR Data:</strong> ${qrData}</p>
        `;
    }
}

// ============= Manual Attendance & Helper Functions =============
function markAttendanceManually() {
    const studentId = document.getElementById('manualStudentId').value.trim();
    
    if (!studentId) {
        alert('Please enter a Student ID');
        return;
    }

    const student = students.find(s => s.id === studentId);
    const manualResult = document.getElementById('manualResult');

    if (!student) {
        manualResult.style.display = 'block';
        manualResult.classList.remove('success');
        manualResult.classList.add('error');
        manualResult.innerHTML = `
            <h4>✗ Student Not Found</h4>
            <p>No student found with ID: <strong>${studentId}</strong></p>
        `;
        return;
    }

    const today = new Date().toLocaleDateString();
    
    // Check if already marked today
    const alreadyMarked = attendance.some(record => 
        record.id === student.id && record.date === today
    );

    if (alreadyMarked) {
        manualResult.style.display = 'block';
        manualResult.classList.remove('success');
        manualResult.classList.add('error');
        manualResult.innerHTML = `
            <h4>⚠️ Already Marked</h4>
            <p><strong>Student:</strong> ${student.name}</p>
            <p>Attendance already marked for today (${today})</p>
        `;
        return;
    }

    // Mark attendance
    const timestamp = new Date();
    const attendanceRecord = {
        id: student.id,
        name: student.name,
        email: student.email,
        checkInTime: timestamp.toLocaleTimeString(),
        date: timestamp.toLocaleDateString(),
        status: 'Present'
    };

    attendance.push(attendanceRecord);
    saveDataToStorage();

    // Show success message
    manualResult.style.display = 'block';
    manualResult.classList.remove('error');
    manualResult.classList.add('success');
    manualResult.innerHTML = `
        <h4>✓ Attendance Marked Successfully</h4>
        <p><strong>Student ID:</strong> ${student.id}</p>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Check-In Time:</strong> ${attendanceRecord.checkInTime}</p>
        <p><strong>Date:</strong> ${attendanceRecord.date}</p>
    `;

    // Clear input
    document.getElementById('manualStudentId').value = '';
}

function toggleInstructions() {
    const instructionsBox = document.querySelector('.instructions-box');
    if (instructionsBox.style.display === 'none') {
        instructionsBox.style.display = 'block';
    } else {
        instructionsBox.style.display = 'none';
    }
}

// ============= Students Management =============
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: #999;">No students added yet</td></tr>';
        return;
    }

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>
                <button class="table-action-btn btn-edit" onclick="editStudent(${index})">Edit</button>
                <button class="table-action-btn btn-delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        saveDataToStorage();
        renderStudentsTable();
    }
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentEmail').value = student.email;

    students.splice(index, 1);
    saveDataToStorage();
    renderStudentsTable();
}

// ============= Attendance Management =============
function renderAttendanceTable(data = null) {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';

    let displayData = data || attendance;

    if (displayData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #999;">No attendance records found</td></tr>';
        return;
    }

    // Sort by date (newest first) and then by check-in time
    displayData = [...displayData].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateB !== dateA) {
            return dateB - dateA;
        }
        // If same date, sort by time
        return b.checkInTime.localeCompare(a.checkInTime);
    });

    displayData.forEach((record, index) => {
        // Find the actual index in the main attendance array for delete function
        const actualIndex = attendance.indexOf(record);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.id || '-'}</td>
            <td>${record.name || '-'}</td>
            <td>${record.email || '-'}</td>
            <td>${record.checkInTime || '-'}</td>
            <td>${record.date || '-'}</td>
            <td><span class="status-present">${record.status || 'Present'}</span></td>
            <td>
                <button class="table-action-btn btn-delete" onclick="deleteAttendance(${actualIndex})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteAttendance(index) {
    if (confirm('Delete this attendance record?')) {
        if (index >= 0 && index < attendance.length) {
            attendance.splice(index, 1);
            saveDataToStorage();
            renderAttendanceTable();
            updateAttendanceStats();
            populateAttendanceFilters();
        }
    }
}

function filterAttendanceByDate() {
    const filterDate = document.getElementById('filterDate').value;
    
    if (!filterDate) {
        renderAttendanceTable();
        return;
    }

    const filtered = attendance.filter(record => record.date === filterDate);
    renderAttendanceTable(filtered);
}

function exportAttendance() {
    if (attendance.length === 0) {
        alert('No attendance records to export');
        return;
    }

    // Create CSV with proper headers and formatting
    let csv = '\uFEFF'; // BOM for Excel UTF-8 compatibility
    csv += 'Student ID,Name,Email,Check-In Time,Date,Status\n';
    
    // Sort attendance records before export
    const sortedAttendance = [...attendance].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateB !== dateA) {
            return dateB - dateA;
        }
        return (b.checkInTime || '').localeCompare(a.checkInTime || '');
    });

    sortedAttendance.forEach(record => {
        const id = (record.id || '').replace(/"/g, '""');
        const name = (record.name || '').replace(/"/g, '""');
        const email = (record.email || '').replace(/"/g, '""');
        const time = (record.checkInTime || '').replace(/"/g, '""');
        const date = (record.date || '').replace(/"/g, '""');
        const status = (record.status || 'Present').replace(/"/g, '""');
        csv += `"${id}","${name}","${email}","${time}","${date}","${status}"\n`;
    });

    downloadCSV(csv, `attendance_${new Date().toISOString().split('T')[0]}.csv`);
    alert('✅ Attendance record exported successfully to Excel!');
}

function clearAllAttendance() {
    if (confirm('Are you sure you want to clear ALL attendance records? This cannot be undone.')) {
        attendance = [];
        saveDataToStorage();
        renderAttendanceTable();
        updateAttendanceStats();
        populateAttendanceFilters();
        alert('All attendance records cleared');
    }
}

// ============= Enhanced Attendance Features =============
function populateAttendanceFilters() {
    const filterStudent = document.getElementById('filterStudent');
    filterStudent.innerHTML = '<option value="">All Students</option>';

    // Get unique students
    const uniqueStudents = [...new Set(attendance.map(a => a.id))];
    
    uniqueStudents.forEach(studentId => {
        const student = students.find(s => s.id === studentId);
        if (student) {
            const option = document.createElement('option');
            option.value = studentId;
            option.textContent = `${student.name} (${studentId})`;
            filterStudent.appendChild(option);
        }
    });
}

function updateAttendanceStats() {
    const today = new Date().toLocaleDateString();
    
    // Total records
    document.getElementById('totalRecords').textContent = attendance.length;
    
    // Unique students
    const uniqueStudents = new Set(attendance.map(a => a.id));
    document.getElementById('uniqueStudents').textContent = uniqueStudents.size;
    
    // Today's attendance
    const todayAttendance = attendance.filter(a => a.date === today);
    document.getElementById('todayCount').textContent = todayAttendance.length;
}

function filterAttendanceByStudent() {
    const studentId = document.getElementById('filterStudent').value;
    const dateValue = document.getElementById('filterDate').value;
    
    let filtered = attendance;
    
    if (studentId) {
        filtered = filtered.filter(a => a.id === studentId);
    }
    
    if (dateValue) {
        filtered = filtered.filter(a => a.date === dateValue);
    }
    
    renderAttendanceTable(filtered);
}

function resetAttendanceFilters() {
    document.getElementById('filterDate').value = '';
    document.getElementById('filterStudent').value = '';
    renderAttendanceTable();
    updateAttendanceStats();
}

function filterAttendanceByDate() {
    filterAttendanceByStudent();
}

function exportAttendancePDF() {
    if (attendance.length === 0) {
        alert('No attendance records to export');
        return;
    }

    let pdfContent = 'ATTENDANCE REPORT\n';
    pdfContent += `Generated: ${new Date().toLocaleString()}\n`;
    pdfContent += '='.repeat(100) + '\n\n';

    // Group by date
    const groupedByDate = {};
    attendance.forEach(record => {
        if (!groupedByDate[record.date]) {
            groupedByDate[record.date] = [];
        }
        groupedByDate[record.date].push(record);
    });

    Object.keys(groupedByDate).sort().reverse().forEach(date => {
        pdfContent += `DATE: ${date}\n`;
        pdfContent += '-'.repeat(100) + '\n';
        pdfContent += `${'ID'.padEnd(15)} ${'Name'.padEnd(20)} ${'Email'.padEnd(30)} ${'Check-In Time'.padEnd(15)}\n`;
        pdfContent += '-'.repeat(100) + '\n';
        
        groupedByDate[date].forEach(record => {
            pdfContent += `${(record.id || '-').padEnd(15)} ${(record.name || '-').padEnd(20)} ${(record.email || '-').padEnd(30)} ${(record.checkInTime || '-').padEnd(15)}\n`;
        });
        
        pdfContent += '\n';
    });

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_report_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
}

// ============= Modal Functions =============
function openModal() {
    document.getElementById('qrModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}

function downloadModalQR() {
    const canvas = document.querySelector('#modalQRCode canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `qrcode_${new Date().getTime()}.png`;
        link.click();
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('qrModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ============= Local Storage =============
function saveDataToStorage() {
    const userKey = currentUser ? `user_${currentUser.id}` : 'default';
    localStorage.setItem(`smartAttendance_students_${userKey}`, JSON.stringify(students));
    localStorage.setItem(`smartAttendance_attendance_${userKey}`, JSON.stringify(attendance));
    localStorage.setItem(`smartAttendance_studentDatabase_${userKey}`, JSON.stringify(studentDatabase));
}

function loadDataFromStorage() {
    const userKey = currentUser ? `user_${currentUser.id}` : 'default';
    const storedStudents = localStorage.getItem(`smartAttendance_students_${userKey}`);
    const storedAttendance = localStorage.getItem(`smartAttendance_attendance_${userKey}`);
    const storedDatabase = localStorage.getItem(`smartAttendance_studentDatabase_${userKey}`);

    students = [];
    attendance = [];
    studentDatabase = [];

    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }

    if (storedAttendance) {
        attendance = JSON.parse(storedAttendance);
    }

    if (storedDatabase) {
        studentDatabase = JSON.parse(storedDatabase);
    }
}

// ============= Student Records =============
function populateStudentFilter() {
    const select = document.getElementById('studentFilter');
    select.innerHTML = '<option value="">Select a Student...</option>';

    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (${student.id})`;
        select.appendChild(option);
    });
}

function filterByStudent() {
    const studentId = document.getElementById('studentFilter').value;
    const recordContainer = document.getElementById('studentRecordContainer');
    const noSelected = document.getElementById('noStudentSelected');

    if (!studentId) {
        recordContainer.style.display = 'none';
        noSelected.style.display = 'block';
        return;
    }

    const student = students.find(s => s.id === studentId);
    const studentAttendance = attendance.filter(a => a.id === studentId);

    // Display student info
    document.getElementById('recordStudentName').textContent = student.name;
    document.getElementById('recordStudentId').textContent = student.id;
    document.getElementById('recordStudentEmail').textContent = student.email;
    document.getElementById('recordTotalPresent').textContent = studentAttendance.length + ' days';

    // Display attendance records
    const tbody = document.getElementById('studentAttendanceBody');
    tbody.innerHTML = '';

    if (studentAttendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: #999;">No attendance records</td></tr>';
    } else {
        studentAttendance.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.checkInTime}</td>
                <td><span class="status-present">${record.status}</span></td>
                <td>
                    <button class="table-action-btn btn-delete" onclick="deleteStudentAttendance('${studentId}', ${index})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    recordContainer.style.display = 'block';
    noSelected.style.display = 'none';
}

function deleteStudentAttendance(studentId, index) {
    const studentAttendance = attendance.filter(a => a.id === studentId);
    
    if (confirm('Delete this attendance record?')) {
        const attIndex = attendance.indexOf(studentAttendance[index]);
        if (attIndex > -1) {
            attendance.splice(attIndex, 1);
            saveDataToStorage();
            filterByStudent();
        }
    }
}

function exportStudentRecord() {
    const studentId = document.getElementById('studentFilter').value;
    
    if (!studentId) {
        alert('Please select a student first');
        return;
    }

    const student = students.find(s => s.id === studentId);
    const studentAttendance = attendance.filter(a => a.id === studentId);

    if (studentAttendance.length === 0) {
        alert('No attendance records for this student');
        return;
    }

    let csv = '\uFEFF'; // BOM for Excel UTF-8
    csv += `Student Name,${student.name}\n`;
    csv += `Student ID,${student.id}\n`;
    csv += `Email,${student.email}\n`;
    csv += `Total Days Present,${studentAttendance.length}\n`;
    csv += `Export Date,${new Date().toLocaleDateString()}\n`;
    csv += `\nDate,Check-In Time,Status\n`;

    // Sort by date descending
    const sortedAttendance = [...studentAttendance].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    sortedAttendance.forEach(record => {
        const date = (record.date || '').replace(/"/g, '""');
        const time = (record.checkInTime || '').replace(/"/g, '""');
        const status = (record.status || 'Present').replace(/"/g, '""');
        csv += `"${date}","${time}","${status}"\n`;
    });

    downloadCSV(csv, `${student.name}_attendance_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ ${student.name}'s attendance record exported to Excel!`);
}

// ============= Statistics Functions =============
function getAttendanceStats() {
    const totalStudents = students.length;
    const totalAttendanceRecords = attendance.length;
    const today = new Date().toLocaleDateString();
    const todayAttendance = attendance.filter(record => record.date === today).length;
    
    return {
        totalStudents,
        totalAttendanceRecords,
        todayAttendance,
        attendanceRate: totalStudents > 0 ? ((todayAttendance / totalStudents) * 100).toFixed(1) : 0
    };
}

function markManualAttendance() {
    const studentId = prompt('Enter Student ID:');
    if (!studentId) return;
    
    const student = students.find(s => s.id === studentId.trim());
    if (!student) {
        alert('Student not found!');
        return;
    }
    
    const today = new Date().toLocaleDateString();
    const alreadyMarked = attendance.some(record => 
        record.id === student.id && record.date === today
    );
    
    if (alreadyMarked) {
        alert('Attendance already marked for this student today!');
        return;
    }
    
    const timestamp = new Date();
    const attendanceRecord = {
        id: student.id,
        name: student.name,
        email: student.email,
        checkInTime: timestamp.toLocaleTimeString(),
        date: timestamp.toLocaleDateString(),
        status: 'Present (Manual)'
    };
    
    attendance.push(attendanceRecord);
    saveDataToStorage();
    renderAttendanceTable();
    alert(`Attendance marked for ${student.name}`);
}

// ============= Student Database Management =============

function addStudentToDatabase() {
    const id = document.getElementById('dbStudentId').value.trim();
    const name = document.getElementById('dbStudentName').value.trim();
    const email = document.getElementById('dbStudentEmail').value.trim();
    const phone = document.getElementById('dbStudentPhone').value.trim();
    const classSection = document.getElementById('dbStudentClass').value.trim();

    if (!id || !name || !email) {
        alert('Please fill in Student ID, Name, and Email');
        return;
    }

    // Check if student already exists
    if (studentDatabase.some(s => s.id === id)) {
        alert('Student ID already exists in database!');
        return;
    }

    const newStudent = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        classSection: classSection,
        joinedDate: new Date().toLocaleDateString(),
        teacherNotes: '',
        performanceLevel: '',
        status: 'Active',
        createdAt: new Date().toISOString()
    };

    studentDatabase.push(newStudent);
    saveDataToStorage();
    
    // Clear form
    document.getElementById('dbStudentId').value = '';
    document.getElementById('dbStudentName').value = '';
    document.getElementById('dbStudentEmail').value = '';
    document.getElementById('dbStudentPhone').value = '';
    document.getElementById('dbStudentClass').value = '';
    
    alert('✅ Student added to database!');
    renderDatabaseTable();
}

function renderDatabaseTable(recordsToShow = null) {
    const tableBody = document.getElementById('databaseTableBody');
    const noDatabaseRecords = document.getElementById('noDatabaseRecords');
    const records = recordsToShow || studentDatabase;

    tableBody.innerHTML = '';

    if (records.length === 0) {
        noDatabaseRecords.style.display = 'block';
        return;
    }

    noDatabaseRecords.style.display = 'none';

    records.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone || '-'}</td>
            <td>${student.classSection || '-'}</td>
            <td>${student.joinedDate}</td>
            <td>
                <button class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9em;" onclick="editStudentNotes('${student.id}')">📝 Notes</button>
                <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.9em;" onclick="deleteStudentFromDatabase('${student.id}')">🗑️ Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editStudentNotes(studentId) {
    const student = studentDatabase.find(s => s.id === studentId);
    if (!student) {
        alert('Student not found!');
        return;
    }

    currentEditingStudent = student;
    document.getElementById('notesStudentName').textContent = `Notes for: ${student.name} (${student.id})`;
    document.getElementById('teacherNotes').value = student.teacherNotes || '';
    document.getElementById('studentPerformance').value = student.performanceLevel || '';
    document.getElementById('studentStatus').value = student.status || 'Active';
    document.getElementById('notesModal').style.display = 'flex';
}

function saveStudentNotes() {
    if (!currentEditingStudent) {
        alert('No student selected!');
        return;
    }

    const notes = document.getElementById('teacherNotes').value.trim();
    const performance = document.getElementById('studentPerformance').value;
    const status = document.getElementById('studentStatus').value;

    currentEditingStudent.teacherNotes = notes;
    currentEditingStudent.performanceLevel = performance;
    currentEditingStudent.status = status;

    saveDataToStorage();
    alert('✅ Notes saved successfully!');
    closeNotesModal();
    renderDatabaseTable();
}

function closeNotesModal() {
    document.getElementById('notesModal').style.display = 'none';
    currentEditingStudent = null;
}

function deleteStudentFromDatabase(studentId) {
    if (confirm('Are you sure you want to delete this student record? This cannot be undone.')) {
        studentDatabase = studentDatabase.filter(s => s.id !== studentId);
        saveDataToStorage();
        alert('✅ Student deleted from database');
        renderDatabaseTable();
    }
}

function searchStudentDatabase() {
    const searchTerm = document.getElementById('dbSearchInput').value.toLowerCase();
    const filtered = studentDatabase.filter(student => 
        student.id.toLowerCase().includes(searchTerm) ||
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    renderDatabaseTable(filtered);
}

function exportDatabase() {
    if (studentDatabase.length === 0) {
        alert('No records to export!');
        return;
    }

    let csv = '\uFEFF'; // BOM for Excel UTF-8
    csv += 'ID,Name,Email,Phone,Class,Joined Date,Performance,Status,Notes\n';
    
    studentDatabase.forEach(student => {
        const id = (student.id || '').replace(/"/g, '""');
        const name = (student.name || '').replace(/"/g, '""');
        const email = (student.email || '').replace(/"/g, '""');
        const phone = (student.phone || '').replace(/"/g, '""');
        const classSection = (student.classSection || '').replace(/"/g, '""');
        const joinedDate = (student.joinedDate || '').replace(/"/g, '""');
        const performance = (student.performanceLevel || '').replace(/"/g, '""');
        const status = (student.status || '').replace(/"/g, '""');
        const notes = (student.teacherNotes || '').replace(/"/g, '""').replace(/\n/g, ' ');
        
        csv += `"${id}","${name}","${email}","${phone}","${classSection}","${joinedDate}","${performance}","${status}","${notes}"\n`;
    });

    downloadCSV(csv, `student_database_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ Database exported! ${studentDatabase.length} student records exported to Excel.`);
}

function clearDatabase() {
    if (confirm('⚠️ This will delete ALL student records! Are you absolutely sure? This cannot be undone.')) {
        if (confirm('Click OK again to confirm deletion of all records.')) {
            studentDatabase = [];
            saveDataToStorage();
            alert('✅ Database cleared');
            renderDatabaseTable();
        }
    }
}

// ============= Universal CSV Download Function =============
function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============= Combined Exports =============
function exportCompleteReport() {
    if (attendance.length === 0 && studentDatabase.length === 0) {
        alert('No data to export!');
        return;
    }

    // 1. Export Attendance Data
    if (attendance.length > 0) {
        let attendanceCSV = '\uFEFF';
        attendanceCSV += 'ATTENDANCE REPORT\n';
        attendanceCSV += `Generated: ${new Date().toLocaleString()}\n`;
        attendanceCSV += `Teacher: ${currentUser.username}\n`;
        attendanceCSV += `Total Records: ${attendance.length}\n\n`;
        attendanceCSV += 'Student ID,Name,Email,Check-In Time,Date,Status\n';
        
        const sortedAttendance = [...attendance].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedAttendance.forEach(record => {
            const id = (record.id || '').replace(/"/g, '""');
            const name = (record.name || '').replace(/"/g, '""');
            const email = (record.email || '').replace(/"/g, '""');
            const time = (record.checkInTime || '').replace(/"/g, '""');
            const date = (record.date || '').replace(/"/g, '""');
            const status = (record.status || 'Present').replace(/"/g, '""');
            attendanceCSV += `"${id}","${name}","${email}","${time}","${date}","${status}"\n`;
        });

        downloadCSV(attendanceCSV, `complete_attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // 2. Export Student Database
    if (studentDatabase.length > 0) {
        let databaseCSV = '\uFEFF';
        databaseCSV += 'STUDENT DATABASE REPORT\n';
        databaseCSV += `Generated: ${new Date().toLocaleString()}\n`;
        databaseCSV += `Teacher: ${currentUser.username}\n`;
        databaseCSV += `Total Students: ${studentDatabase.length}\n\n`;
        databaseCSV += 'ID,Name,Email,Phone,Class,Joined Date,Performance,Status,Notes\n';
        
        studentDatabase.forEach(student => {
            const id = (student.id || '').replace(/"/g, '""');
            const name = (student.name || '').replace(/"/g, '""');
            const email = (student.email || '').replace(/"/g, '""');
            const phone = (student.phone || '').replace(/"/g, '""');
            const classSection = (student.classSection || '').replace(/"/g, '""');
            const joinedDate = (student.joinedDate || '').replace(/"/g, '""');
            const performance = (student.performanceLevel || '').replace(/"/g, '""');
            const status = (student.status || '').replace(/"/g, '""');
            const notes = (student.teacherNotes || '').replace(/"/g, '""').replace(/\n/g, ' ');
            
            databaseCSV += `"${id}","${name}","${email}","${phone}","${classSection}","${joinedDate}","${performance}","${status}","${notes}"\n`;
        });

        downloadCSV(databaseCSV, `student_database_report_${new Date().toISOString().split('T')[0]}.csv`);
    }

    alert('✅ All reports exported to Excel!');
}

// ============= App Links & Utility Functions =============
// Toggle app links panel visibility
function toggleAppLinks() {
    const panel = document.getElementById('appLinksPanel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

// Copy text to clipboard with visual feedback
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Copied to clipboard: ' + text);
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ Copied to clipboard: ' + text);
    });
}

// Prompt user for network IP and provide full network URL
function promptNetworkIP() {
    const ip = prompt('Enter your computer IP address:\n(Find with: Open cmd → type ipconfig → find IPv4 Address)\n\nExample: 192.168.1.100');
    if (ip && ip.trim()) {
        const networkUrl = `http://${ip.trim()}:8000`;
        copyToClipboard(networkUrl);
    }
}

// Prevent form submission on Enter key for inputs
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        if (e.target.id === 'studentEmail') {
            const id = document.getElementById('studentId').value.trim();
            const name = document.getElementById('studentName').value.trim();
            const email = e.target.value.trim();
            if (id && name && email) {
                generateQRCode();
            }
        }
    }
});
