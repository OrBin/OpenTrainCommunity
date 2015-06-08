# -*- coding: utf-8 -*-

HEB_NAMES = {
    3700: ["תל אביב סבידור מרכז", 'ת"א סבידור מרכז'],
    3600: ['תל אביב אוניברסיטה', 'ת"א אוניברסיטה'],
    8600: ['נתב"ג', 'נמל תעופה בן-גוריון'],
    4600: ['תל אביב השלום', 'ת"א השלום']
}

for k, v in HEB_NAMES.iteritems():
    assert isinstance(k, int), 'for k = %s key must be integer' % k
    assert isinstance(v, list), 'for k = %s value must be list of string' % k
