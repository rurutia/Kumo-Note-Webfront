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
 
@Controller
@RequestMapping("/")
public class BaseController {
	
	@Autowired
	Dao dao;
 
	@RequestMapping(value="/welcome", method = RequestMethod.GET)
	@ResponseBody
	public String welcome(ModelMap model) throws JsonGenerationException, JsonMappingException, IOException {
		model.addAttribute("message", "Maven Web Project + Spring 3 MVC - welcome()");
		ObjectMapper mapper = new ObjectMapper();
	    System.out.println(mapper.writeValueAsString(dao.getTasks()));
		//Spring uses InternalResourceViewResolver and return back index.jsp
		return mapper.writeValueAsString(dao.getTasks());
 
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