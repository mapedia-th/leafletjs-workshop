--CREATE OR REPLACE VIEW pop_age_0_4 AS
with age as (
select tam_th, tam_code, amp_th, amp_code, prov_th, prov_code,
       sum(m_age_0+f_age_0+m_age_1+f_age_1+m_age_2+f_age_2
       +m_age_3+f_age_3+m_age_4+f_age_4) as age_0_4
       ,t_tot
from population
group by tam_th, tam_code, amp_th, amp_code, prov_th, prov_code
) select tam_th,amp_th,prov_th,sum(age_0_4*100/t_tot) 
from age
group by tam_th,amp_th,prov_th