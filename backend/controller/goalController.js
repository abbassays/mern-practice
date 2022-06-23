const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler(async (req, res) => {
    // Get all goals of a user
    const goals = await Goal.find({ user: req.user.id })
    // Send response
    res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
    // check if goal has text
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    // Create a new goal
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    // return the goal
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
    id = req.params.id
    // check if id is goal valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        throw new Error('Invalid id')
    }
    // check if goal exists
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400)
        throw new Error('No goal with id: ', id)
    }
    // find user of goal
    const user = await User.findById(req.user.id);
    // Check if user exists
    if (!user) {
        res.status(400)
        throw new Error('No user with id: ', req.user.id)
    }
    // if user is not the owner of the goal, return error
    if (goal.user.toString() !== user.id.toString()) {
        res.status(401)
        throw new Error('You are not authorized to update this goal')
    }
    // update goal
    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
        new: true,
    })
    // return updated goal
    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
    id = req.params.id
    // check if id is goal valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        throw new Error('Invalid id')
    }
    // check if goal exists
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400)
        throw new Error('No goal with id: ', id)
    }
    // find user of goal
    const user = await User.findById(req.user.id);
    // Check if user exists
    if (!user) {
        res.status(400)
        throw new Error('No user with id: ', req.user.id)
    }
    // if user is not the owner of the goal, return error
    if (goal.user.toString() !== user.id.toString()) {
        res.status(401)
        throw new Error('You are not authorized to update this goal')
    }
    // delete goal
    const deletedGoal = await Goal.findByIdAndDelete(id)
    // return deleted goal
    res.status(200).json(deletedGoal)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}