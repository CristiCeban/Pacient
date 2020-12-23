package com.pacienti.pacient.Model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "diagnostic")
public class DiagnosticDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codboala;

    private String denumire;

    private String tip;

    @JsonIgnore
    @OneToMany(mappedBy = "diagnostic")
    private List<TratamentDao> tratament;



}
