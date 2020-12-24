package com.pacienti.pacient.CustomRepository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.pacienti.pacient.DTO.TratamentMedicament;




public class CustomProjectRepositoryImp implements CustomProjectRepository {

    
    private final EntityManager em;

    CustomProjectRepositoryImp(EntityManager em){
        this.em = em;
    }

    @Override
    public TratamentMedicament getMedicamentToMedic() {
        String queryString = "select medic_id,cod_medicament,sum(cantitate) as cantitati from tratament  GROUP BY ROLLUP(medic_id,cod_medicament)";
        try {
            Query query = em.createNativeQuery(queryString,"MedicinePerDoctor");

            return (TratamentMedicament)query.getResultList();
            } catch (Exception e) {
            //TODO: handle exception
        }
        
        return null;
    }
    
}
