package cttypes

import (
	prototypes "confidentialWasm/cttypes/confidentialtransfers"

	"github.com/she-protocol/she-cryptography/pkg/ct_module/types"
)

func NewMsgApplyPendingBalanceProto(applyPendingBalance *types.ApplyPendingBalance) *prototypes.MsgApplyPendingBalance {
	currentAvailableBalance := NewCiphertextProto(applyPendingBalance.CurrentAvailableBalance)

	return &prototypes.MsgApplyPendingBalance{
		Address:                        applyPendingBalance.Address,
		Denom:                          applyPendingBalance.Denom,
		NewDecryptableAvailableBalance: applyPendingBalance.NewDecryptableAvailableBalance,
		CurrentPendingBalanceCounter:   applyPendingBalance.CurrentPendingBalanceCounter,
		CurrentAvailableBalance:        currentAvailableBalance,
	}
}
