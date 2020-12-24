package com.pacienti.pacient.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.pacienti.pacient.DTO.TratamentMedicament;
import com.pacienti.pacient.Repository.ProjectRepository;
import com.pacienti.pacient.Repository.TratamentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdditionalService {
    @PersistenceContext 
    private EntityManager em;


    public TratamentMedicament getMedicamentPerMedic(){
        String queryString = "select medic_id,cod_medicament,sum(cantitate) as cantitati from tratament  GROUP BY ROLLUP(medic_id,cod_medicament)";
        try {
            Query query = em.createNativeQuery(queryString);

            return new TratamentMedicament((Object[]) query.getSingleResult());
            } catch (Exception e) {
           e.printStackTrace();
        }
        
        return null;
    }
}
