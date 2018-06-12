const router = require("express").Router();
const controllers = require("../controllers");
const passport = require('../scripts/passportConfig');

// Routes to Events

//  Get Events Data Managed 
router.get('/managed/events/get/:id', controllers.events.getOwnedEvents)


// Approve Attendee toggle 
router.post('/managed/events/approve', controllers.events.approveAttend)
router.post('/managed/events/revoke', controllers.events.revokeAttend)

// Delete guest from event
router.post('/managed/events/delete/guest', controllers.events.removeGuest)

// Create Events 
router.post('/managed/create/event', controllers.events.createEvent)

// Update an event
router.post('/managed/event', controllers.events.updateEvent)

// Get Events Data signedUp
router.get('/get/event/:id', controllers.events.getEventData)


// Sign up for event 
router.post('/attend/event', controllers.events.attendEvent)

//  Event completed sort all attendees for analysis
router.post('/event/done', controllers.events.eventCompleted)

router.post('/event/checkin', controllers.events.checkInToggle)
module.exports = router;
