package com.cbssoft.www;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

public class Dao {

	  @Autowired
	  private SqlSession sqlSession;

	  public List<Task> getTasks() {
	    return sqlSession.selectList("com.cbssoft.www.TaskMapper.getTasks");
	  }

}
