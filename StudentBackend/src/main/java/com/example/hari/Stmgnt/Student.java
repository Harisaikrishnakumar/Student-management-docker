package com.example.hari.Stmgnt;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rollno;
    private String name;
    private String email;
    private int age;
    private String branch;
    private String college;

    public Student() {}

    public Long getId() { return id; }
    public int getRollno() { return rollno; }
    public void setRollno(int rollno) { this.rollno = rollno; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    @Override
    public String toString() {
        return "Student [id=" + id + ", rollno=" + rollno + ", name=" + name + ", email=" + email +
                ", age=" + age + ", branch=" + branch + ", college=" + college + "]";
    }
}
