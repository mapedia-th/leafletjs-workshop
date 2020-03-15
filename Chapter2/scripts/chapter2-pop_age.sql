--CREATE OR REPLACE VIEW pop_age AS
select tam_th, tam_code, amp_th, amp_code, prov_th, prov_code,
       sum(m_age_0+f_age_0+m_age_1+f_age_1+m_age_2+f_age_2
       +m_age_3+f_age_3+m_age_4+f_age_4+m_age_5+f_age_5+m_age_6+f_age_6
       +m_age_7+f_age_7+m_age_8+f_age_8+m_age_9+f_age_9+m_age_10+f_age_10
       +m_age_11+f_age_11+m_age_12+f_age_12+m_age_13+f_age_13+m_age_14+f_age_14) as age_0_14,
       sum(m_age_15+f_age_15+m_age_16+f_age_16+m_age_17+f_age_17+m_age_18+f_age_18
       +m_age_19+f_age_19+m_age_20+f_age_20+m_age_21+f_age_21+m_age_22+f_age_22
       +m_age_23+f_age_23+m_age_24+f_age_24+m_age_25+f_age_25+m_age_26+f_age_26
       +m_age_27+f_age_27+m_age_28+f_age_28+m_age_29+f_age_29+m_age_30+f_age_30
       +m_age_31+f_age_31+m_age_32+f_age_32+m_age_33+f_age_33+m_age_34+f_age_34
       +m_age_35+f_age_35+m_age_36+f_age_36+m_age_37+f_age_37+m_age_38+f_age_38
       +m_age_39+f_age_39+m_age_40+f_age_40+m_age_41+f_age_41+m_age_42+f_age_42
       +m_age_43+f_age_43+m_age_44+f_age_44+m_age_45+f_age_45+m_age_46+f_age_46
       +m_age_47+f_age_47+m_age_48+f_age_48+m_age_49+f_age_49+m_age_50+f_age_50
       +m_age_51+f_age_51+m_age_52+f_age_52+m_age_53+f_age_53+m_age_54+f_age_54
       +m_age_55+f_age_55+m_age_56+f_age_56+m_age_57+f_age_57+m_age_58+f_age_58
       +m_age_59+f_age_59) as age_15_59, 
	   sum(m_age_60+f_age_60+m_age_61+f_age_61
       +m_age_62+f_age_62+m_age_63+f_age_63+m_age_64+f_age_64+m_age_65+f_age_65
       +m_age_66+f_age_66+m_age_67+f_age_67+m_age_68+f_age_68+m_age_69+f_age_69
       +m_age_70+f_age_70+m_age_71+f_age_71+m_age_72+f_age_72+m_age_73+f_age_73
       +m_age_74+f_age_74+m_age_75+f_age_75+m_age_76+f_age_76+m_age_77+f_age_77
       +m_age_78+f_age_78+m_age_79+f_age_79+m_age_80+f_age_80+m_age_81+f_age_81
       +m_age_82+f_age_82+m_age_83+f_age_83+m_age_84+f_age_84+m_age_85+f_age_85
       +m_age_86+f_age_86+m_age_87+f_age_87+m_age_88+f_age_88+m_age_89+f_age_89
       +m_age_90+f_age_90+m_age_91+f_age_91+m_age_92+f_age_92+m_age_93+f_age_93
       +m_age_94+f_age_94+m_age_95+f_age_95+m_age_96+f_age_96+m_age_97+f_age_97
       +m_age_98+f_age_98+m_age_99+f_age_99+m_age_100+f_age_100+m_age_101+f_age_101) as age_60_101
       ,t_tot
from population
group by tam_th, tam_code, amp_th, amp_code, prov_th, prov_code