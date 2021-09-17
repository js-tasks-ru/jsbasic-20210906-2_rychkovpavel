function showSalary(users, age) {
  let ageUsersСorresponds = users.filter(item => item.age <= age);
  let usersNameAndSalary = ageUsersСorresponds.map(item => `${item.name}, ${item.balance}`);
  let strUsers = usersNameAndSalary.join('\n');
    
  return strUsers;
}
