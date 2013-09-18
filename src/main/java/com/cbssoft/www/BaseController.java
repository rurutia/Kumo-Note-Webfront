package com.cbssoft.www;
 
import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cbssoft.www.dao.NoteDao;
import com.cbssoft.www.domain.Note;

@Controller
@RequestMapping("/")
public class BaseController {
	
	@Autowired
	private Dao dao;
	
	@Autowired
	private NoteDao noteDao;
 
	@RequestMapping(value="/load-notes", method = RequestMethod.GET)
	@ResponseBody
	public String welcome(ModelMap model) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(noteDao.selectNotes());
	}
	
	@RequestMapping(value="/note", method = RequestMethod.GET)
	@ResponseBody
	public String insertNote() {
		Note note = new Note();
		note.setContent("new content");
		note.setSubject("new subject");
		note.setType("new type");
		noteDao.insertNote(note);
		return "fn";
	}
	
	@RequestMapping(value="/save-note", method = RequestMethod.POST)
	@ResponseBody
	public String saveNote(Note note) {
		System.out.println("saving note.......");
		noteDao.insertNote(note);
		return "insert ok"; 
	}
	
	@RequestMapping(value="/delete-note/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteNote(@PathVariable int id) {
		System.out.println("deleting note.......");
		noteDao.deleteNote(id);
		return "delete ok"; 
	}
	
	
	
	@RequestMapping(method = RequestMethod.GET)
	public String index(ModelMap model) {
		return "index";
	}
 
	@RequestMapping(value="/welcome/{name}", method = RequestMethod.GET)
	public String welcomeName(@PathVariable String name, ModelMap model) {
 
		model.addAttribute("message", "Maven Web Project + Spring 3 MVC - " + name);
		return "index-welcome";
 
	}
 
}