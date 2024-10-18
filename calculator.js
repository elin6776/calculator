cfunction addCourse() {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.innerHTML = `
        <input type="checkbox" class="select-row">
        <label>Course Name:</label>
        <input type="text" class="course-name" placeholder="e.g., Science">
        <label>Grade:</label>
        <select class="grade">
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D">D</option>
            <option value="D-">D-</option>
            <option value="F">F</option>
        </select>
        <label>Credits:</label>
        <input type="number" class="credits" placeholder="e.g., 3">
        <button class="remove-row" onclick="removeCourse(this)">X</button>
    `;
    document.getElementById('courses').appendChild(courseDiv);
}

function removeCourse(button) {
    button.parentElement.remove();
}

function resetFields() {
    const rows = document.querySelectorAll('.course');
    rows.forEach(row => {
        if (row.querySelector('.select-row').checked) {
            row.querySelector('.course-name').value = '';
            row.querySelector('.grade').value = '';
            row.querySelector('.credits').value = '';
        }
    });
}

function calculateGPA() {
    const rows = document.querySelectorAll('.course');
    let totalGradePoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        const isChecked = row.querySelector('.select-row').checked;
        if (isChecked) {
            const grade = row.querySelector('.grade').value;
            const credit = parseFloat(row.querySelector('.credits').value);

            if (grade && !isNaN(credit)) {
                const gradePoints = getGradePoints(grade);
                totalGradePoints += gradePoints * credit;
                totalCredits += credit;
            }
        }
    });

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    document.getElementById('result').textContent = `Your GPA: ${gpa.toFixed(2)}`;
}

function getGradePoints(grade) {
    const gradeScale = {
        'A+': 4.3,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'D-': 0.7,
        'F': 0.0
    };
    return gradeScale.hasOwnProperty(grade) ? gradeScale[grade] : 0.0;
}
