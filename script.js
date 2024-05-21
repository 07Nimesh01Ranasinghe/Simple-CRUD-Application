let users = [];

function renderUserList() {
  const userListElement = document.getElementById('user-list');
  userListElement.innerHTML = '';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerHTML = `
      <p>${user.firstName} ${user.lastName} - ${user.email}</p>
      <button onclick="updateUser(${user.id})">Update</button>
      <button onclick="deleteUser(${user.id})">Delete</button>
    `;
    userListElement.appendChild(userElement);
  });
}

function addUser() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();

  if (firstName === '' || lastName === '' || email === '') {
    alert('Please fill in all fields.');
    return;
  }

  const newUser = {
    id: Date.now(),
    firstName,
    lastName,
    email
  };

  users.push(newUser);
  renderUserList();
  clearForm();
}

function deleteUser(userId) {
  users = users.filter(user => user.id !== userId);
  renderUserList();
}

function updateUser(userId) {
  const userToUpdate = users.find(user => user.id === userId);
  if (!userToUpdate) {
    alert('User not found.');
    return;
  }

  document.getElementById('firstName').value = userToUpdate.firstName;
  document.getElementById('lastName').value = userToUpdate.lastName;
  document.getElementById('email').value = userToUpdate.email;
  // Update addUser button to updateUser button
  const addUserButton = document.querySelector('#user-form button');
  addUserButton.textContent = 'Update User';
  addUserButton.onclick = () => {
    saveUpdatedUser(userToUpdate.id);
  };
}

function saveUpdatedUser(userId) {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();

  if (firstName === '' || lastName === '' || email === '') {
    alert('Please fill in all fields.');
    return;
  }

  const updatedUser = {
    id: userId,
    firstName,
    lastName,
    email
  };

  users = users.map(user => (user.id === userId ? updatedUser : user));
  renderUserList();
  clearForm();
  // Change button text back to "Add User"
  const addUserButton = document.querySelector('#user-form button');
  addUserButton.textContent = 'Add User';
  addUserButton.onclick = addUser;
}

function clearForm() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('email').value = '';
}

window.onload = function() {
  renderUserList();
};
