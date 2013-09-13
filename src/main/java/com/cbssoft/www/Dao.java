package com.cbssoft.www;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

public class Dao {

	  private SqlSession sqlSession;

	  public void setSqlSession(SqlSession sqlSession) {
	    this.sqlSession = sqlSession;
	  }

	  public List<Task> getTasks() {
	    return sqlSession.selectList("com.cbssoft.www.TaskMapper.getTasks");
	  }

}
