import { Injectable } from '@angular/core';
import { Parser } from 'binary-parser';
import { ProgressionParser } from '../../helpers/d2sParser/progression';
import { Util } from '../../helpers/d2sParser/util';
import { ParseBase } from './parse-base';

@Injectable({ providedIn: 'root' })
export class ParseHeader extends ParseBase {
    private readonly classes = [
        'Amazon',
        'Sorceress',
        'Necromancer',
        'Paladin',
        'Barbarian',
        'Druid',
        'Assassin'
    ];

    constructor(util: Util) {
        super(util);
    }

    protected buildParser(parser: Parser, util: Util): Parser {
        console.log('buildParser header', parser, util);
        return parser
            .int32le(...util.obj('file.header'))
            .int32le('file.version')
            .int32le('file.size')
            .int32le('file.checksum')
            .seek(this.long)
            .string('character', { length: 16, stripNull: true, ...util.wrap('name') })
            .int8('character.status', util.flags([0, 0, 'isHardcore', 'hasDied', 0, 'isExpansionCharacter']))
            .int8('character.progression', {
                formatter: function (progression) {
                    return ProgressionParser.parse(
                        progression,
                        (this as any).character.status.isExpansionCharacter);
                }
            })
            .seek(this.byte * 2)
            .bit4('character.class', { formatter: value => this.classes[value] })
            .seek(this.byte * 2)
            .uint8('character.level')
            .seek(this.long)
            .int32le('last_played', util.date())
            .array('skills', { type: 'int32le', length: 16, ...util.wrap('assigned') })
            .int32le('skills.left')
            .int32le('skills.right')
            .int32le('skills.leftSwap')
            .int32le('skills.rightSwap')
            .seek(this.byte * 32)
            // Below this doesn't seem ok
            .uint8('difficulty', util.wrap('normal'))
            .uint8('difficulty.nightmare')
            .uint8('difficulty.hell')
            .int32le('map_id')
            .seek(this.byte * 2)
            .int16le('merc', util.wrap('dead'))
            .int32le('merc.id')
            .int16le('merc.name_id')
            .int16le('merc.type')
            .int32le('merc.experience')
            .seek(this.byte * 144)
            .string('quest', { length: 4, stripNull: true, ...util.wrap('header') })
            .seek(this.byte * 6);
    }

    // Identifier        uint32      `json:"identifier"`
	// Version           uint32      `json:"version"`
	// FileSize          uint32      `json:"filesize"`
	// CheckSum          uint32      `json:"checksum"`
	// ActiveArms        uint32      `json:"active_arms"`
	// Name              name        `json:"name"`
	// Status            status      `json:"status"`
	// Progression       progression `json:"progression"`
	// _                 [2]byte
	// Class             class `json:"class"`
	// _                 [2]byte
	// Level             byte `json:"level"`
	// _                 [4]byte
	// LastPlayed        uint32 `json:"last_played"`
	// _                 [4]byte
	// AssignedSkills    [16]uint32 `json:"assigned_skills"`
	// LeftSkill         uint32     `json:"left_skill"`
	// RightSkill        uint32     `json:"right_skill"`
	// LeftSwapSkill     uint32     `json:"left_swap_skill"`
	// RightSwapSkill    uint32     `json:"right_swap_skill"`
	// _                 [32]byte
	// CurrentDifficulty difficulty `json:"difficulty"`
	// MapID             uint32     `json:"map_id"`
	// _                 [2]byte
	// DeadMerc          uint16 `json:"dead_merc"`
	// MercID            uint32 `json:"merc_id"`
	// MercNameID        uint16 `json:"merc_name_id"`
	// MercType          uint16 `json:"merc_type"`
	// MercExp           uint32 `json:"merc_experience"`
	// _                 [144]byte
	// QuestHeader       [4]byte `json:"-"`
	// _                 [6]byte
	// QuestsNormal      quests  `json:"quests_normal"`
	// QuestsNm          quests  `json:"quests_nm"`
	// QuestsHell        quests  `json:"quests_hell"`
	// WaypointHeader    [2]byte `json:"-"`
	// _                 [6]byte
	// WaypointsNormal   [24]byte `json:"-"`
	// WaypointsNm       [24]byte `json:"-"`
	// WaypointsHell     [24]byte `json:"-"`
	// WaypointTrailer   byte     `json:"-"`
	// NPCHeader         [2]byte  `json:"-"`
	// _                 byte
	// NPCIntroNormal    [5]byte `json:"-"`
	// _                 [3]byte
	// NPCIntroNm        [5]byte `json:"-"`
	// _                 [3]byte
	// NPCIntroHell      [5]byte `json:"-"`
	// _                 [3]byte
	// NPCReturnNorm     [4]byte `json:"-"`
	// _                 [4]byte
	// NPCReturnNm       [4]byte `json:"-"`
	// _                 [4]byte
	// NPCReturnHell     [4]byte `json:"-"`
	// _                 [4]byte
	// StatHeader        [2]byte `json:"-"`

}
