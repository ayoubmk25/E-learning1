package com.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.application.model.User;
import com.application.repository.UserRepository;

@Service
public class UserService 
{
	@Autowired
	private UserRepository userRepo;
	
	public User saveUser(User user)
	{
		return userRepo.save(user);
	}
	
	public User updateUserProfile(User user)
	{
		User Uuser = userRepo.findByEmail(user.getEmail());

		Uuser.setUserid(user.getUserid());
		Uuser.setUsername(user.getUsername());
		Uuser.setAddress(user.getAddress());
		Uuser.setMobile(user.getMobile());
		Uuser.setProfession(user.getProfession());


		return userRepo.save(Uuser);
	}

	public void delete(User user){
		userRepo.delete(user);
	}
	
	public List<User> getAllUsers()
	{
		return (List<User>)userRepo.findAll();
	}
	
	public User fetchUserByEmail(String email)
	{
		return userRepo.findByEmail(email);
	}
	
	public User fetchUserByUsername(String username)
	{
		return userRepo.findByUsername(username);
	}
	
	public User fetchUserByEmailAndPassword(String email, String password)
	{
		return userRepo.findByEmailAndPassword(email, password);
	}
	
	public List<User> fetchProfileByEmail(String email)
	{
		return (List<User>)userRepo.findProfileByEmail(email);
	}
}