package com.pacienti.pacient.Model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "diagnostic")
public class DiagnosticDao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer codboala;

    private String denumire;

    private String tip;

    @JsonIgnore
    @OneToMany(mappedBy = "diagnostic")
    private List<TratamentDao> tratament;



}
