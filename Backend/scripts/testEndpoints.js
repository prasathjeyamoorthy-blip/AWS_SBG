const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Idea = require('../models/Idea');
const Phase = require('../models/Phase');
const authController = require('../controllers/authController');
const teamController = require('../controllers/teamController');
const ideaController = require('../controllers/ideaController');
const phaseController = require('../controllers/phaseController');

// Simple test helper to format assertion output
let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// Helper to create mocked req and res
function createMockReqRes(body = {}, headers = {}, params = {}) {
  const req = { body, headers, params, user: null };
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    }
  };
  return { req, res };
}

// ----------------------------------------------------
// Test Suite Setup
// ----------------------------------------------------
async function runTests() {
  console.log('--- STARTING BACKEND REST API TEST SUITE ---\n');

  // Set JWT_SECRET in environment for test
  process.env.JWT_SECRET = 'testsecretkey';

  // --- Test 1: Register Team (POST /auth/register) - Success ---
  console.log('Testing: Register Team (POST /auth/register) - Success');
  const originalUserFindOne = User.findOne;
  const originalUserSave = User.prototype.save;

  // Stub User.findOne to return null (meaning email does not exist)
  User.findOne = async () => null;
  // Stub User.prototype.save to be a successful save
  User.prototype.save = async function() { return this; };

  const { req: regReq, res: regRes } = createMockReqRes({
    email: 'captain@pirate.com',
    password: 'password123',
    team_name: 'StrawHat',
    year_of_passing: 2027,
    team_members: [
      { name: 'Luffy', gender: 'Male', phno: '1234567890', email: 'luffy@pirate.com' },
      { name: 'Zoro', gender: 'Male', phno: '0987654321', email: 'zoro@pirate.com' }
    ]
  });

  await authController.registerTeam(regReq, regRes);
  assert(regRes.statusCode === 201, 'Response status should be 201 Created');
  assert(regRes.jsonData && regRes.jsonData.success === true, 'Response should contain success: true');
  assert(regRes.jsonData && regRes.jsonData.message === 'Team registered successfully', 'Response should match registration success message');

  // --- Test 2: Register Team (POST /auth/register) - Email Collision ---
  console.log('\nTesting: Register Team (POST /auth/register) - Email Collision');
  // Stub User.findOne to return a mock user (email exists)
  User.findOne = async () => ({ email: 'captain@pirate.com' });

  const { req: collReq, res: collRes } = createMockReqRes({
    email: 'captain@pirate.com',
    password: 'password123',
    team_name: 'StrawHat',
    year_of_passing: 2027,
    team_members: []
  });

  await authController.registerTeam(collReq, collRes);
  assert(collRes.statusCode === 400, 'Response status should be 400 Bad Request');
  assert(collRes.jsonData && collRes.jsonData.success === false, 'Response should contain success: false');
  assert(collRes.jsonData && collRes.jsonData.message === 'Email already exists', 'Response should match collision error message');

  // --- Test 3: Login User (POST /auth/login) - Success ---
  console.log('\nTesting: Login User (POST /auth/login) - Success');
  const testPassword = 'password123';
  const hashedPass = await bcrypt.hash(testPassword, 10);
  
  // Stub User.findOne to return valid user info
  User.findOne = async () => ({
    _id: '507f1f77bcf86cd799439011',
    email: 'captain@pirate.com',
    password_hash: hashedPass
  });

  const { req: loginReq, res: loginRes } = createMockReqRes({
    email: 'captain@pirate.com',
    password: testPassword
  });

  await authController.loginUser(loginReq, loginRes);
  assert(loginRes.statusCode === 200, 'Response status should be 200 OK');
  assert(loginRes.jsonData && loginRes.jsonData.success === true, 'Response should contain success: true');
  assert(loginRes.jsonData && loginRes.jsonData.token !== undefined, 'Response should return JWT token');
  assert(loginRes.jsonData && loginRes.jsonData.message === 'Login successful', 'Response should match login success message');

  // Verify JWT decodes correctly
  if (loginRes.jsonData && loginRes.jsonData.token) {
    const decoded = jwt.verify(loginRes.jsonData.token, 'testsecretkey');
    assert(decoded._id === '507f1f77bcf86cd799439011', 'JWT payload should contain correct user _id');
    assert(decoded.email === 'captain@pirate.com', 'JWT payload should contain correct email');
  }

  // --- Test 4: Login User (POST /auth/login) - Invalid Password ---
  console.log('\nTesting: Login User (POST /auth/login) - Invalid Password');
  const { req: loginWrongReq, res: loginWrongRes } = createMockReqRes({
    email: 'captain@pirate.com',
    password: 'wrongpassword'
  });

  await authController.loginUser(loginWrongReq, loginWrongRes);
  assert(loginWrongRes.statusCode === 401, 'Response status should be 401 Unauthorized');
  assert(loginWrongRes.jsonData && loginWrongRes.jsonData.success === false, 'Response should contain success: false');
  assert(loginWrongRes.jsonData && loginWrongRes.jsonData.message === 'Invalid email or password', 'Response should match invalid password message');

  // --- Test 5: Get Team Details (GET /team/details) ---
  console.log('\nTesting: Get Team Details (GET /team/details)');
  const originalUserFindById = User.findById;

  // Stub User.findById chain
  User.findById = function(id) {
    assert(id === '507f1f77bcf86cd799439011', 'findById query should match req.user.id');
    return {
      select(fields) {
        assert(fields === '-password_hash', 'Query should exclude password_hash');
        return {
          _id: id,
          email: 'captain@pirate.com',
          team_name: 'StrawHat',
          year_of_passing: 2027,
          team_members: []
        };
      }
    };
  };

  const { req: detailsReq, res: detailsRes } = createMockReqRes();
  detailsReq.user = { id: '507f1f77bcf86cd799439011', email: 'captain@pirate.com' };

  await teamController.getTeamDetails(detailsReq, detailsRes);
  assert(detailsRes.statusCode === 200, 'Response status should be 200 OK');
  assert(detailsRes.jsonData && detailsRes.jsonData.success === true, 'Response should contain success: true');
  assert(detailsRes.jsonData && detailsRes.jsonData.data.password_hash === undefined, 'Returned user object must exclude password_hash');
  assert(detailsRes.jsonData && detailsRes.jsonData.data.team_name === 'StrawHat', 'Returned user object should have valid team name');

  // --- Test 6: Submit Idea Form (POST /idea/submit) - Success ---
  console.log('\nTesting: Submit Idea Form (POST /idea/submit) - Success');
  const originalIdeaFindOne = Idea.findOne;
  const originalIdeaSave = Idea.prototype.save;

  // Stub Idea.findOne to return null (no idea submitted yet)
  Idea.findOne = async () => null;
  Idea.prototype.save = async function() { return this; };

  const { req: ideaReq, res: ideaRes } = createMockReqRes({
    abstract: 'A decentralized treasure tracking network using pirate carrier pigeons.',
    domain: 'Web3',
    industry: 'Logistics',
    business_model: 'SaaS'
  });
  ideaReq.user = { id: '507f1f77bcf86cd799439011', email: 'captain@pirate.com' };

  await ideaController.submitIdea(ideaReq, ideaRes);
  assert(ideaRes.statusCode === 201, 'Response status should be 201 Created');
  assert(ideaRes.jsonData && ideaRes.jsonData.success === true, 'Response should contain success: true');
  assert(ideaRes.jsonData && ideaRes.jsonData.message === 'Idea submitted successfully', 'Response should match idea success message');

  // --- Test 7: Submit Idea Form (POST /idea/submit) - Duplication ---
  console.log('\nTesting: Submit Idea Form (POST /idea/submit) - Duplication');
  // Stub Idea.findOne to return an existing idea (duplication check)
  Idea.findOne = async () => ({ _id: 'mock_idea_id' });

  const { req: ideaDupReq, res: ideaDupRes } = createMockReqRes({
    abstract: 'Duplicate proposal',
    domain: 'Web3',
    industry: 'Logistics',
    business_model: 'SaaS'
  });
  ideaDupReq.user = { id: '507f1f77bcf86cd799439011', email: 'captain@pirate.com' };

  await ideaController.submitIdea(ideaDupReq, ideaDupRes);
  assert(ideaDupRes.statusCode === 400, 'Response status should be 400 Bad Request');
  assert(ideaDupRes.jsonData && ideaDupRes.jsonData.success === false, 'Response should contain success: false');
  assert(ideaDupRes.jsonData && ideaDupRes.jsonData.message === 'Idea already submitted', 'Response should match duplicate submission error message');

  // --- Test 8: Check Idea Status (GET /idea/status) - Submitting True ---
  console.log('\nTesting: Check Idea Status (GET /idea/status) - True');
  const originalIdeaExists = Idea.exists;
  
  // Stub Idea.exists to return true
  Idea.exists = async (query) => {
    assert(query.user_id === '507f1f77bcf86cd799439011', 'exists query should filter by user_id');
    return { _id: 'some_existing_id' };
  };

  const { req: statusTrueReq, res: statusTrueRes } = createMockReqRes();
  statusTrueReq.user = { id: '507f1f77bcf86cd799439011', email: 'captain@pirate.com' };

  await ideaController.checkIdeaStatus(statusTrueReq, statusTrueRes);
  assert(statusTrueRes.statusCode === 200, 'Response status should be 200 OK');
  assert(statusTrueRes.jsonData && statusTrueRes.jsonData.success === true, 'Response should contain success: true');
  assert(statusTrueRes.jsonData && statusTrueRes.jsonData.idea_submitted === true, 'idea_submitted should be true');

  // --- Test 9: Check Idea Status (GET /idea/status) - Submitting False ---
  console.log('\nTesting: Check Idea Status (GET /idea/status) - False');
  // Stub Idea.exists to return null (not exists)
  Idea.exists = async () => null;

  const { req: statusFalseReq, res: statusFalseRes } = createMockReqRes();
  statusFalseReq.user = { id: '507f1f77bcf86cd799439011', email: 'captain@pirate.com' };

  await ideaController.checkIdeaStatus(statusFalseReq, statusFalseRes);
  assert(statusFalseRes.statusCode === 200, 'Response status should be 200 OK');
  assert(statusFalseRes.jsonData && statusFalseRes.jsonData.success === true, 'Response should contain success: true');
  assert(statusFalseRes.jsonData && statusFalseRes.jsonData.idea_submitted === false, 'idea_submitted should be false');

  // --- Test 10: Get Current Phase (GET /phase/current) ---
  console.log('\nTesting: Get Current Phase (GET /phase/current)');
  const originalPhaseFindOne = Phase.findOne;

  // Stub Phase.findOne to return active registration phase
  Phase.findOne = async (query) => {
    assert(query.is_active === true, 'findOne query should look for active phase');
    return {
      phase_name: 'Registration',
      phase_order: 1,
      is_active: true
    };
  };

  const { req: phaseReq, res: phaseRes } = createMockReqRes();
  phaseReq.user = { id: '507f1f77bcf86cd799439011', email: 'captain@pirate.com' };

  await phaseController.getCurrentPhase(phaseReq, phaseRes);
  assert(phaseRes.statusCode === 200, 'Response status should be 200 OK');
  assert(phaseRes.jsonData && phaseRes.jsonData.success === true, 'Response should contain success: true');
  assert(phaseRes.jsonData && phaseRes.jsonData.current_phase === 'Registration', 'current_phase name should match seeded value');

  // --- Restore all stubs ---
  User.findOne = originalUserFindOne;
  User.prototype.save = originalUserSave;
  User.findById = originalUserFindById;
  Idea.findOne = originalIdeaFindOne;
  Idea.prototype.save = originalIdeaSave;
  Idea.exists = originalIdeaExists;
  Phase.findOne = originalPhaseFindOne;

  console.log('\n--- REST API TEST SUITE SUMMARY ---');
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);

  if (failCount > 0) {
    console.error('\nSome tests failed!');
    process.exit(1);
  } else {
    console.log('\nAll tests completed successfully! The backend logic is robust and matches API spec exactly.');
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Test runner encountered error:', err);
  process.exit(1);
});
