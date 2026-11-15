# RESTful Front-End Web App: Student Project

**Team Members:**
- 
- 
- 

**Walk-Through Video Link:** [Add your video link here]

**Include an image of your hand-drawn or digital wireframe sketch here:**
[Add wireframe image or description]

---
---
---



## Build Your App: Step-by-Step Checklist & Rubric

**Total Points: 100 | Bonus: Extra Credit Available**

---

# Phase 1: Planning & API Setup [10 pts]
*Set up your mock API and plan your data model.*

- [ ] **Domain Selection:** Choose a unique project domain with two related entities. Example: Clubs (primary) & Students (secondary). Write down what each entity represents.
- [ ] **Wireframe Sketch:** Draw a hand-sketch or digital wireframe showing all your app pages (list view, detail view, create form, edit form). Include labels for each page.
- [ ] **Mock API Account:** Create an account on mockapi.io (or similar: JSON Server, ApiMocker) and create a new project.
- [ ] **Primary Resource Schema:** Create your first resource (e.g., `clubs`) with fields: `name`, `description`, `thumbnail`/`image`, and `users` (ID array). 
- [ ] **Secondary Resource Schema:** Create your second resource (e.g., `users`/`students`) with fields: `name`, `email`/`detail`, `avatar`/`image`.
- [ ] **Sample Data:** Add at least 3 records to each resource so you have data to display and test with.
- [ ] **API Base URL:** Copy your project's base URL (e.g., `https://XXXXXXXX.mockapi.io/api/v1`). Verify it works by opening it in your browser and seeing JSON.

---

# Phase 2: Project Structure & File Organization [10 pts]
*Build the folder layout and connect your API.*

- [ ] **Root Files:** Create `index.html` (redirects to your main list page) and `style.css` (one shared stylesheet for all pages).
- [ ] **Folder Structure:** Create two subdirectories: one for your primary resource (e.g., `clubs/`) and one for your secondary resource (e.g., `students/`).
- [ ] **Link Stylesheet:** Link `../style.css` in the `<head>` of every HTML file so they all share the same styles.
- [ ] **API Constants:** At the top of every `.js` file, add:
  ```js
  const API_ORIGIN = "https://XXXXXXXX.mockapi.io";
  const API_URL = `${API_ORIGIN}/api/v1`;
  ```
  Replace with your actual base URL. Update all 7 files (view, detail, new, edit for primary resource; list, detail, new for secondary).

---

# Phase 3: HTML Structure & Navigation [15 pts]
*Build semantic HTML with navigation and content containers.*

- [ ] **Semantic Layout (All Pages):** Every page includes `<nav>`, `<main>`, and structural tags. No `<div>` soup.
- [ ] **Navigation Bar:** Create a consistent `<nav>` with `<ul><li>` links to: Home (list view), and the other resource type. Example: from clubs, link to Students.
- [ ] **List Page (`view_collection.html`):** Add a `<main>` with a container (e.g., `<div id="clubs">`) where you'll insert cards dynamically. Include a "Add New" affordance.
- [ ] **Detail Page (`item.html`):** Add a `<main>` with sections for the item's details, an Edit link, and a container (e.g., `<ul id="members">`) for related items.
- [ ] **Create Form (`new_item.html`):** Add a `<form id="item_form">` with labeled `<input>`, `<textarea>`, and a `<button type="submit">`.
- [ ] **Edit Form (`edit_item.html`):** Same as Create, plus form fields pre-populate with existing data, and include a Delete button.
- [ ] **Related Items Pages:** Create similar pages for your secondary resource (list, detail, create, but edit is optional).

---

# Phase 4: Display All Records (GET Collection) [12 pts]
*Load and show a list of all primary resource records.*

**Files to Update:** `view_collection.js` (e.g., `view_clubs.js`)

- [ ] **Async Fetch Function:** Write an async function that `fetch()`s `${API_URL}/[resource]` (e.g., `/clubs`).
- [ ] **Handle Response:** Await the response and convert it to JSON: `const data = await response.json()`.
- [ ] **Loop & Render:** Loop through each record and build a card/item HTML string. Insert into your container (e.g., `#clubs`).
- [ ] **Card Template:** Each card shows: thumbnail/image, name, and a brief description. Add an "Edit" link/button that passes the ID: `href="edit_item.html?id=${record.id}"`.
- [ ] **Add Button:** After all records, insert an "Add New [Item]" card or button linking to `new_item.html`.
- [ ] **Load on Page Open:** Call your fetch function on `window.addEventListener("load", fetchFunction)`.
- [ ] **Click Navigation:** Add a click listener to the container so clicking a card (but not the Edit button) navigates to the detail page with the ID in the URL.

**Test:** When you load the list page, you should see all your records as cards.

---

# Phase 5: Display Single Record (GET by ID) [12 pts]
*Load and show details for one specific record.*

**Files to Update:** `item.js` (e.g., `club.js`) and `item.html`

- [ ] **Extract ID from URL:** At the top of your script, get the ID from the query string:
  ```js
  const itemId = new URLSearchParams(window.location.search).get("id");
  ```
- [ ] **Fetch One Record:** Write an async function that `fetch()`s `${API_URL}/[resource]/${itemId}`.
- [ ] **Display Details:** Populate the page with the record's name, description, image, etc.
- [ ] **Edit Link:** Add an "Edit" button/link that passes the ID: `href="edit_item.html?id=${itemId}"`.
- [ ] **Fetch Related Records:** Also fetch the other resource type (e.g., fetch all students). Store it in a variable.
- [ ] **Filter & Display Related Items:** Filter the related records by matching IDs (e.g., students whose IDs are in the club's `users` array). Display them as a list.
- [ ] **Link Related Items:** Each related item should link to its own detail page with its ID (e.g., `href="../students/student.html?id=${student.id}"`).
- [ ] **Load on Page Open:** Call your fetch function on `window.addEventListener("load", ...)`.

**Test:** Click a card from the list. You should see the detail page with the record's info and a list of related records.

---

# Phase 6: Create New Records (POST) [13 pts]
*Let users add new records via a form.*

**Files to Update:** `new_item.js` (e.g., `new_club.js`) and `new_item.html`

- [ ] **Form in HTML:** Create a form with inputs for each field (name, description, image URL). Add a submit button labeled "Create [Item]".
- [ ] **Form Handler:** Add an event listener for `submit` on the form. Call `event.preventDefault()` to stop the page reload.
- [ ] **Collect Values:** Read the input values from the form fields (e.g., `form.name.value`).
- [ ] **Build Object:** Create a new object with the values. For related-item arrays, start with an empty array (e.g., `users: []`).
- [ ] **POST Request:** Use `fetch()` with `method: "POST"`, `headers: { "Content-Type": "application/json" }`, and `body: JSON.stringify(object)`.
- [ ] **Default Image:** If the user leaves the image field empty, generate a default using a placeholder service (e.g., `https://picsum.photos/seed/${name}/600/400`).
- [ ] **Redirect on Success:** After the POST succeeds, redirect back to the list page: `window.location.href = "view_collection.html"`.
- [ ] **Test:** Fill out the form and submit. The new record should appear in the list immediately.

---

# Phase 7: Update Records (PUT) [13 pts]
*Let users edit existing records.*

**Files to Update:** `edit_item.js` (e.g., `edit_club.js`) and `edit_item.html`

- [ ] **Extract ID & Fetch:** Get the ID from the URL query string. Fetch the current record data.
- [ ] **Pre-populate Form:** Fill the form inputs with the existing record's values so users see what they're editing.
- [ ] **Form Handler:** Add a submit event listener. Call `event.preventDefault()`.
- [ ] **Collect Updated Values:** Read the updated input values from the form.
- [ ] **Build Updated Object:** Create an object with the new values. Keep the related-item array (e.g., `users: [...]`) as-is unless the user intentionally changes it.
- [ ] **PUT Request:** Use `fetch()` with `method: "PUT"`, headers, and the updated object as JSON body.
- [ ] **Redirect on Success:** After the PUT succeeds, redirect to the detail page: `window.location.href = "item.html?id=${itemId}"`.
- [ ] **Delete Button:** Add a separate Delete button that removes the record (see Phase 8).
- [ ] **Add/Remove Relationships (Optional for Now):** If your form allows adding/removing related items (e.g., adding students to a club), update the array before sending the PUT.
- [ ] **Test:** Edit a record and verify the changes appear on the detail page and list page.

---

# Phase 8: Delete Records (DELETE) [10 pts]
*Let users remove records.*

**Files to Update:** `edit_item.js` and `edit_item.html`

- [ ] **Delete Button:** Add a "Delete [Item]" button to the edit page HTML.
- [ ] **Delete Handler:** Add a click listener to the button with a confirmation (e.g., `confirm("Are you sure?")`).
- [ ] **DELETE Request:** Use `fetch()` with `method: "DELETE"` to `${API_URL}/[resource]/${itemId}`.
- [ ] **Redirect on Success:** After the DELETE succeeds, redirect to the list page: `window.location.href = "view_collection.html"`.
- [ ] **Test:** Delete a record. It should disappear from the list and API.

---

# Phase 9: Object Relationships & Relational Data [15 pts]
*Master linking records together.*

- [ ] **Understand the Pattern:** Your primary resource stores an array of IDs from the secondary resource (e.g., a club stores `users: ["1", "3", "5"]`). This is the "relationship."
- [ ] **Display Relationships (Already Done in Phase 5):** On a detail page, filter the secondary resource by matching IDs: 
  ```js
  const related = allRecords.filter(r => primaryRecord.array.includes(r.id));
  ```
- [ ] **Add a Relationship:** On the edit page, provide a way to add a related record (e.g., a dropdown of students). When updated, push the ID onto the array before the PUT.
- [ ] **Remove a Relationship:** Provide a way to unlink records (e.g., an "X" button on each related item). Filter it out of the array before the PUT: 
  ```js
  primaryRecord.array = primaryRecord.array.filter(id => id !== removedId);
  ```
- [ ] **Update Both Directions (Optional):** If needed, also update the related record to reflect the change (e.g., update a student's club list).
- [ ] **Test Thoroughly:** Add, remove, and reassign relationships. Verify they persist in the API and display correctly across pages.

---

# Phase 10: Polish & Error Handling [4 pts]
*Make your app robust and user-friendly.*

- [ ] **Error Handling:** Wrap `fetch()` calls in `try/catch`. Check `response.ok` before parsing JSON:
  ```js
  if (!response.ok) throw new Error("API error");
  ```
- [ ] **User Feedback:** Show messages for success (e.g., "Club created!") or errors (e.g., "Failed to load. Try again.").
- [ ] **Form Validation:** Check that required fields aren't empty before sending POST/PUT.
- [ ] **Loading States:** Show a spinner or "Loading..." message while fetching data.

---

# Phase 11: Code Walkthrough Video [10 pts]
*Demonstrate your project with a screen-share recording.*

- [ ] **Screen-Share Recording:** Record a video (5–10 minutes) walking through your code and demonstrating the app.
- [ ] **Project Tour:** Show the folder structure and explain how your resources relate (e.g., "Clubs are the primary resource, and students belong to clubs").
- [ ] **Code Explanation:** Open one fetch function and explain: "This fetches all clubs from the API, converts the response to JSON, and then loops through each one to build a card."
- [ ] **API Example:** Show the API endpoint in your browser (e.g., `https://...mockapi.io/api/v1/clubs`) and explain the JSON structure.
- [ ] **Live Demonstration:** Show the app running in the browser. Create a new record, edit it, view relationships, and delete it. Narrate what's happening.
- [ ] **Relational Data Explanation:** Explain how relationships work: "When I add a student to a club, I push their ID into the club's `users` array, then PUT it back to the API."
- [ ] **Post the Link:** Include the link to your recording at the top of this README.

---

# Bonus Extension Challenges [Extra Credit - 10+ pts each]
*Go beyond the basics.*

- [ ] **Third Resource:** Add a third resource type (e.g., "Events" linked to clubs) with full CRUD and relationship support.
- [ ] **Live Search:** Add a search input to the list page that filters cards as the user types, matching names or descriptions.
- [ ] **Sort & Filter Options:** Add buttons to sort (alphabetically, by date) or filter (by category) the list.
- [ ] **Cascading Deletes:** When a record is deleted, automatically remove its ID from all related records' arrays.
- [ ] **Reusable Navigation Component:** Extract the navigation bar into a shared HTML file and include it on every page (using `fetch()` or a template).
- [ ] **Advanced UI:** Add animations, a dark mode toggle, or better styling with a CSS framework.

---