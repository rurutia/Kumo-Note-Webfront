package com.cbssoft.www;
 
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
 
	@RequestMapping(value="/notes/load", method = RequestMethod.GET)
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
	
	// Converters in Spring register for certain content-type (for the request body) and accept (for the response). 
	// For json it's application/json and some others. For XML it's application/xml and some others. 
	// Make sure your client sends content-type: application/json and accept: application/json	
	@RequestMapping(value="/notes/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveNote(@RequestBody Note note) throws JsonGenerationException, JsonMappingException, IOException { 
		System.out.println("saving note.......");
		noteDao.insertNote(note);
		Map<String, String> result = new HashMap<String,String>();
		result.put("success", "true");
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(result);
	}
	
	@RequestMapping(value="/notes/update/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public String updateNote(@RequestBody Note note) {
		System.out.println("updating note.......");
		noteDao.updateNote(note);
		return "update ok"; 
	}
	
	@RequestMapping(value="/notes/delete/{id}", method = RequestMethod.DELETE)
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