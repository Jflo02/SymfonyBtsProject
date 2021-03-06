<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VaccinRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=VaccinRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['vaccin_read']]
)]
class Vaccin
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vaccin_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=VaccinType::class, inversedBy="vaccins")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"vaccin_read", "vaccination_read","sejour_read"})
     */
    private $vaccin_type;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVaccinType(): ?VaccinType
    {
        return $this->vaccin_type;
    }

    public function setVaccinType(?VaccinType $vaccin_type): self
    {
        $this->vaccin_type = $vaccin_type;

        return $this;
    }
}
