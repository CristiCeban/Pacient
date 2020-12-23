package com.pacienti.pacient.Model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "pacient")
public class PacientDao {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true,name = "cnp")
    private Long cnp;

    private String nume;

    private String prenume;

    private Integer varsta;

    private String tipasig;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private UserDao user;

    @JsonIgnore
    @OneToMany(mappedBy = "pacient")
    private List<RetetaDao> reteta;

    @JsonIgnore
    @OneToMany(mappedBy = "pacient")
    private List<TratamentDao> tratament;
}
