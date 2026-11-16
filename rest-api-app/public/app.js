
const API = "/api/students";

// Notification
function notify(message) {
    const box = document.getElementById("notification");
    box.textContent = message;
    box.style.display = "block";

    setTimeout(() => {
        box.style.display = "none";
    }, 3000);
}

// Safely display text in HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Check API and database
async function checkHealth() {
    try {
        const response = await fetch("/api/health");
        const result = await response.json();

        document.getElementById("serverStatus").textContent =
            result.server === "online" ? "● API ONLINE" : "● API ERROR";

        document.getElementById("dbStatus").textContent =
            result.database === "connected" ? "CONNECTED" : "OFFLINE";

    } catch (error) {
        document.getElementById("serverStatus").textContent = "● OFFLINE";
        document.getElementById("dbStatus").textContent = "OFFLINE";
    }
}

// Load all students
async function loadStudents() {
    const table = document.getElementById("studentsTable");

    try {
        const response = await fetch(API);
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to load students");
        }

        document.getElementById("totalStudents").textContent =
            result.count ?? result.data.length;

        if (!result.data.length) {
            table.innerHTML =
                '<tr><td colspan="5">No students found.</td></tr>';
            return;
        }

        table.innerHTML = result.data.map(student => `
            <tr>
                <td>${escapeHTML(student.id)}</td>
                <td>${escapeHTML(student.name)}</td>
                <td>${escapeHTML(student.email)}</td>
                <td>${escapeHTML(student.age ?? "-")}</td>
                <td>
                    <button onclick="editStudent(${Number(student.id)})">
                        Edit
                    </button>
                    <button class="danger"
                        onclick="deleteStudent(${Number(student.id)})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join("");

    } catch (error) {
        table.innerHTML = `
            <tr><td colspan="5">
                Error: ${escapeHTML(error.message)}
            </td></tr>
        `;
        notify(error.message);
    }
}

// Create or update student
document.getElementById("studentForm").addEventListener(
    "submit", async function(event) {

    event.preventDefault();

    const id = document.getElementById("studentId").value;

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        age: document.getElementById("age").value
            ? Number(document.getElementById("age").value)
            : null
    };

    try {
        const response = await fetch(
            id ? `${API}/${id}` : API,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Request failed");
        }

        notify(result.message);
        resetForm();
        await loadStudents();

    } catch (error) {
        notify(error.message);
    }
});

// Edit student
async function editStudent(id) {
    try {
        const response = await fetch(`${API}/${id}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Student not found");
        }

        const student = result.data;

        document.getElementById("studentId").value = student.id;
        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("age").value = student.age ?? "";

        document.getElementById("formTitle").textContent =
            "Edit Student";

        document.getElementById("saveButton").textContent =
            "Update Student";

        document.getElementById("studentForm").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        notify(error.message);
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm(`Are you sure you want to delete student ${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Delete failed");
        }

        notify(result.message);
        await loadStudents();

    } catch (error) {
        notify(error.message);
    }
}

// Reset student form
function resetForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";

    document.getElementById("formTitle").textContent =
        "Add New Student";

    document.getElementById("saveButton").textContent =
        "Create Student";
}

// Test API endpoints
async function testEndpoint() {
    const method = document.getElementById("method").value;
    const endpoint = document.getElementById("endpoint").value.trim();

    const output = document.getElementById("responseOutput");
    const status = document.getElementById("responseStatus");

    // Only allow paths belonging to this API
    if (!endpoint.startsWith("/api/") ||
        endpoint.startsWith("//") ||
        endpoint.includes("..") ||
        endpoint.includes("?") && endpoint.includes("#")) {
        notify("Enter a valid /api/ endpoint");
        return;
    }

    if (method === "DELETE" &&
        !confirm("This request may permanently delete data. Continue?")) {
        return;
    }

    let body;

    if (method === "POST" || method === "PUT") {
        try {
            body = JSON.parse(
                document.getElementById("requestBody").value
            );
        } catch {
            notify("Invalid JSON request body");
            return;
        }
    }

    output.textContent = "Sending request...";
    status.textContent = "Testing...";

    const start = performance.now();

    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            ...(body !== undefined
                ? { body: JSON.stringify(body) }
                : {})
        });

        const duration = Math.round(performance.now() - start);

        const text = await response.text();

        let result;
        try {
            result = JSON.parse(text);
        } catch {
            result = text;
        }

        status.textContent =
            `${response.status} ${response.statusText} | ${duration}ms`;

        output.textContent = JSON.stringify({
            httpStatus: response.status,
            success: response.ok,
            duration: `${duration}ms`,
            response: result
        }, null, 2);

    } catch (error) {
        status.textContent = "REQUEST FAILED";
        output.textContent = error.message;
    }
}

// Initial dashboard loading
checkHealth();
loadStudents();

// Refresh health periodically
setInterval(checkHealth, 15000);
