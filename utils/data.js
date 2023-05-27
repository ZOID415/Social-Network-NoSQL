

const users = [
    { username: "malfaro", email: "ma93@hotmail.com", thoughts: [] },
    { username: "mfa", email: "mfa@yahoo.com", thoughts: [] },
    { username: "zoid", email: "zoid@gmail.com" , thoughts: [] },
  ];
  

  const thoughts = [
    { thoughtText: "The chicken came first", username: "malfaro", reactions: [{ reactionBody: "Agreed", username: "zoid" }] },
    { thoughtText: "The chicken crossed the road", username: "zoid", reactions: [{ reactionBody: "To cross the road", username: "mfa" }] },
    { thoughtText: "The egg came first", username: "mfa", reactions: [{ reactionBody: "Noo", username: "malfaro" }] },
  ];
  
  module.exports = { users, thoughts };