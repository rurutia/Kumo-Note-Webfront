package com.haoyumichael.note.domain;

public class Note {

	int id;
	String subject;
	String content;
	String type;
	String date;
	String mainType;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMainType() {
		return mainType;
	}
	public void setMainType(String mainType) {
		this.mainType = mainType;
	}
	
}
