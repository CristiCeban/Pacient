package com.pacienti.pacient.Controller;

import com.pacienti.pacient.DTO.PacientsDto;
import com.pacienti.pacient.Model.UserDao;
import com.pacienti.pacient.Service.JwtUserDetailsService;
import com.pacienti.pacient.Service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/pacient")
public class PacientController {
    @Autowired
    private PacientService pacientService;

    @Autowired
    private JwtUserDetailsService userService;

    @GetMapping
    public PacientsDto getPacients(@RequestParam("page") int page, @RequestParam("size") int size,
                                   Authentication authentication) {
        UserDao user = userService.currentUser(authentication);

        return pacientService.getPacients(page,size,user);
    }
}
