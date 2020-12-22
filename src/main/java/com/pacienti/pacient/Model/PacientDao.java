package com.pacienti.pacient.Model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "pacient")
public class PacientDao {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(unique = true,name = "cnp")
    private String cnp;

    private String nume;

    private String prenume;

    private Integer varsta;

    private String tipasig;

    @OneToOne(mappedBy = "pacient")
    private UserDao user;


}
