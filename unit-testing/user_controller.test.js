const request = require("supertest");
const app = require("../app.js");

const token = "secret";
const request_user_register = {
  email: "hallo@email.com",
  password: "admin",
  name: "haha",
};

let user_id = 0;

// Register User
describe("POST /users/register", () => {
  test("should register a user", async () => {
    return request(app)
      .post("/users/register")
      .send(request_user_register)
      .expect(200)
      .then(({ body }) => {
        user_id = body.id;
      });
  });
});

// Get User by Id
describe("GET /users/:id", () => {
  test("should return one user", async () => {
    return request(app)
      .get(`/users/${user_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

// Post User Profile Picture
describe("POST /users/upload/:id", () => {
  test("should upload a file", async () => {
    const image = `../Homework/deadpool_pic.jpg`; // Lokasi file yang akan diupload

    const response = await request(app)
      .post(`/users/upload/${user_id}`)
      .attach("profile_pictures", image); // Mengirim file sebagai form data

    expect(response.status).toBe(200);
  });
});

// Login User

// Get User

// Update User
describe("PATCH /users/:id", () => {
  test("should update user data", async () => {
    const request_user_update = {
      email: "hallo@email.com",
      password: "admin",
      name: "update",
    };

    const response = await request(app)
      .patch(`/users/${user_id}`)
      .send(request_user_update);

    expect(response.status).toBe(200);
  });
});

// Delete User
describe("DELETE /users/:id", () => {
    test("should soft delete user data", async () => {
      return request(app)
        .delete(`/users/${user_id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });