import Todo from "../models/todo.js";
import User from "../models/user.js";

export const updateTodo = async (id) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    return { success: false, status: 404, message: "Todo not found" };
  }

  const isCompleted = todo.completed;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { completed: !isCompleted },
    { new: true },
  );

  const user = await User.findOne({ email: updatedTodo.from_user });
  await user.addXP(isCompleted ? 0 : 10);

  let streak;

  if (!isCompleted) {
    streak = await streakCount(todo.from_user);
  }

  return {
    success: true,
    status: 200,
    message: "Task updated",
    xp: isCompleted ? -10 : 10,
    streak: streak?.streak ?? null,
    data: updatedTodo,
  };
};

export const streakCount = async (userEmail) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const user = await User.findOne({ email: userEmail });

  if (!user.lastCompletedDate) {
    user.streak += 1;
    user.lastCompletedDate = today;
    user.save();
    return { status: 200, message: "Streak added", streak: 1 };
  }

  const last = new Date(user.lastCompletedDate);
  last.setHours(0, 0, 0, 0);

  const diff = (today - last) / (1000 * 60 * 60 * 24);

  if (diff === 0) return;
  else if (diff === 1) {
    user.streak += 1;
  } else {
    user.streak = 1;
  }

  user.lastCompletedDate = today;
  await user.save();
  const updatedUser = await User.findById(user._id);
  return {
    status: 200,
    success: true,
    message: "Streak added",
    streak: updatedUser.streak,
  };
};